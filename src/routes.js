require('dotenv');
const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const multerConfig = require('./config/multer');
const connection = require('./dataBase/dbConnection');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util')

//CONTROLLERS
const protetorController = require('./controllers/protetorController');
const processoController = require('./controllers/processoController');
const searchProcessController = require('./controllers/searchProcessController');
const larTemporarioController = require('./controllers/larTemporarioController');
const comentarioController = require('./controllers/comentarioController');
const loginController = require('./controllers/loginController');
const pesquisaLTController = require('./controllers/pesquisaLTController');
const pesquisarPerfilController = require('./controllers/pesquisaPerfilController');
const reclameController = require('./controllers/reclameController');
const passwordController = require('./controllers/passwordController');

//ROTA RAIZ
routes.get('/', (req, res) => {
    return res.json('TELA INICIAL');
});

//CRIANDO IMAGEM
routes.post('/user/imagens/:id', multer(multerConfig).single('file'), async (req, res) => {
    const {id} = req.params;
    var a = JSON.stringify(id);
    const token = a.substring(1, a.length-1);

    const url = `https://ephemeral-back.herokuapp.com/files/${req.file.filename}`;
    console.log(url);
    console.log(token.length)
    if(token.length > 11) {
        console.log('mais 10')
        const tokenDecode = jwt.decode(token);
        const idUser = tokenDecode.idUser;
    
        await connection('uploads').insert({
            idUser:idUser, 
            name: req.file.originalname,
            size: req.file.size, 
            key: req.file.filename, 
            url: url
        });
    }
    else{
        console.log('menos 10')
        await connection('uploads').insert({
            idUser:id, 
            name: req.file.originalname,
            size: req.file.size, 
            key: req.file.filename, 
            url: url
        });
    }

    return res.status(200).send();
});

//EXCLUINDO IMAGEM
routes.delete('/user/deleteImagens/:id', async (req, res) => {
    console.log('delete')
    const {id} = req.params;
    var a = JSON.stringify(id);
    const token = a.substring(1, a.length-1);
    const tokenDecode = jwt.decode(token);
    const idUser = tokenDecode.idUser;

    const [picture] = await connection.select().from('uploads').where({idUser:idUser});
    console.log('picture', picture)
    if(picture) {
        await connection('uploads').del().where({idUser:idUser})
        promisify(fs.unlink)(path.resolve(__dirname, "..", "tmp", "uploads", picture.key))
        return res.status(200).send();
    }
    else {
        return res.json('erro');
    }
});

//PEGANDO IMAGEM PROPRIA
routes.get('/user/ownImagens/:id', async (req, res) => {
    const {id} = req.params;
    var a = JSON.stringify(id);
    const token = a.substring(1, a.length-1);
    const tokenDecode = jwt.decode(token);
    const idUser = tokenDecode.idUser;

    const [response] = await connection.select('url').from('uploads').where({idUser: idUser});
    return res.json(response);
});

//PEGANDO IMAGEM LT
routes.get('/lt/ownImagens/:id', async (req, res) => {
    const {id} = req.params;
    const [response] = await connection.select('url').from('uploads').where({idUser: id});
    return res.json(response);
});

//ROTAS DO LOGIN
routes.post('/login', loginController.store);

//ROTAS DO PROTETOR
routes.post('/user', protetorController.store);
routes.get('/user/all', protetorController.indexAll);
routes.put('/user/settings/update/:id', protetorController.update);
routes.delete('/user/settings/delete/:id', protetorController.destroy);

//TESTE
routes.post('/user/teste/nom', protetorController.teste1);
routes.post('/user/teste/em', protetorController.teste2);


//PESQUISA DO PROTETOR POR LT
routes.get('/user/ecb/lt', pesquisaLTController.indexECB);
routes.get('/user/ec/lt', pesquisaLTController.indexEC);
routes.get('/user/e/lt', pesquisaLTController.indexE);

//PESQUISA PARA ATUALIZAÇÃO DO PERFIL
routes.get('/user/settings/:id', protetorController.indexSetting);
routes.get('/lt/settings/:id', larTemporarioController.indexSetting);

//PESQUISA PELO PERFIL PRÓPRIO
routes.get('/user/:id', pesquisarPerfilController.indexP);
routes.get('/lt/:idLT', pesquisarPerfilController.indexLT);

//ROTAS DO LAR TEMPORÁRIO
routes.put('/lt/settings/update/:id', larTemporarioController.update);

//ROTAS DO PROCESSO
routes.post('/process/:id/:idLT', processoController.store);
routes.put('/process/atualiza/:idProcesso', processoController.updateLT);
routes.get('/process/all', processoController.indexAll);
routes.delete('/process/deleta/:idProcesso', processoController.destroy); 

//SELECT DOS PROCESSOS COMO LT OU PROTETOR
routes.get('/process/search/protetor/:id', searchProcessController.indexProtetor);
routes.get('/process/search/lt/emAndamento/:id', searchProcessController.indexLTEA); 
routes.get('/process/search/lt/concluido/:id', searchProcessController.indexLTC); 

//ROTAS DO COMENTÁRIO FEITO
routes.post('/coment/:id/user/:idLarTemp', comentarioController.store);
routes.get('/coment/all', comentarioController.indexAll); 
routes.get('/coment/search/destinatario/:id', comentarioController.indexDestin); 
routes.get('/coment/search/destinatariolt/:id', comentarioController.indexDestinLT); 
routes.delete('/coment/delete/:idComentario', comentarioController.destroy); 

//RECLAMAÇÕES
routes.post('/reclameAqui', reclameController.store);
routes.get('/reclameAqui/pesquisa', reclameController.indexAll);

//ENVIO DO EMAIL
routes.put('/user/alterarSenha', passwordController.updateSenha);

module.exports = routes;