const express = require('express');
const routes = express.Router();

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

//ROTA RAIZ
routes.get('/', (req, res) => {
    return res.json('TELA INICIAL');
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

module.exports = routes;