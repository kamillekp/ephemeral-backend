const connection = require('../dataBase/dbConnection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = {
    //SALVAR COMENTARIO 
    async store (req, res) {
        try {
            //PEGANDO DATA ATUAL
            var data = new Date();
            var dia = data.getDate();
            var mes = data.getMonth() + 1;
            var ano = data.getFullYear();
            var dataComentario;

            if(dia < 10) {
                dataComentario  = '0' + dia + '/' + mes + '/' + ano
              if(mes < 10) {
                dataComentario  = '0' + dia + '/0' + mes + '/' + ano
              }
            }
            else if(mes < 10) {
                dataComentario  = dia + '/0' + mes + '/' + ano
              if(dia < 10) {
                dataComentario  = '0' + dia + '/0' + mes + '/' + ano
              }
            }
            else {
                dataComentario = dia + '/' + mes + '/' + ano
            }

            console.log(dataComentario);

            //REQUISIÇÕES
            const {texto} = req.body;
            const {id, idLarTemp} = req.params;
            console.log(texto)

            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;

            //SELECIONAR USERNAMEREMETENTE
            const [nomeUserRemetente] = await connection.select('nomeUser').from('user').where({idUser: idUser});
            console.log('remetente: ' + nomeUserRemetente.nomeUser);

            //CONFIRMAR SE DESTINATARIO EXISTE
            const [nomeUserDestinatario] = await connection.select('nomeUser').from('user').where({idUser: idLarTemp});
            console.log('destinatário: ' + nomeUserDestinatario.nomeUser);

            if(nomeUserDestinatario.nomeUser !== ""){
                //CRIANDO ID DO COMENTARIO
                const idComent = crypto.randomBytes(8).toString('HEX');

                await connection('comentario').insert({
                    idComentario: idComent, userNameRemetente:nomeUserRemetente.nomeUser, userNameDestinatario: nomeUserDestinatario.nomeUser, texto, dataComent: dataComentario
                });
                return res.status(201).json('Comentário realizado.');
            }
        }
        catch (error) {
            return res.status(400).send(error);
        }
    },

    //LISTAR TODOS OS COMENTARIOS 
    async indexAll (req, res) {
        try{
            const results = await connection.select().from('comentario');
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },

    //LISTAR COMENTÁRIOS PARA UM DESTINATÁRIO ESPECÍFICO LT
     async indexDestinLT (req, res) {
        try{
            //REQUISIÇÃO
            console.log('oii')
            const {page = 1} = req.query;
            const {id} = req.params;

            //VERIFICANDO SE NOMEUSER EXISTE
            const [nomeUser] = await connection.select('nomeUser').from('user').where({idUser:id});

            const results = await connection.select('idComentario', 'userNameRemetente', 'texto', 'dataComent').from('comentario')
            .where({userNameDestinatario: nomeUser.nomeUser})
            /*.limit(5)
            .offset((page - 1) * 5)*/
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },

    //LISTAR COMENTÁRIOS PARA O PERFIL PRÓPRIO  
    async indexDestin (req, res) {
        try{
            //REQUISIÇÃO
            const {page = 1} = req.query;
            const {id} = req.params;

            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;

            //VERIFICANDO SE NOMEUSER EXISTE
            const [nomeUser] = await connection.select('nomeUser').from('user').where({idUser:idUser});

            const results = await connection.select('idComentario', 'userNameRemetente', 'texto', 'dataComent').from('comentario')
            .where({userNameDestinatario: nomeUser.nomeUser})
            /*.limit(3)
            .offset((page - 1) * 3)*/
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },
    
    //DELETAR UM COMENTARIO DE UM REMETENTE
    async destroy (req, res) {
        try {
            //REQUISIÇÕES
            const {idComentario} = req.params;

            await connection('comentario').where({idComentario:idComentario}).del();
            return res.send();
        }
        catch (error) {
            return res.status(400).send(error);
        }
    },
}