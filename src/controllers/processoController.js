const connection = require('../dataBase/dbConnection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = {
    //SALVAR PROCESSO
    async store (req, res) {
        try {
            //REQUISIÇÕES
            const {id, idLT} = req.params;

            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;

            //CRIANDO ID DO PROCESSO
            const idProcess = crypto.randomBytes(8).toString('HEX');

            //VERIFICANDO SE LT EXISTE PELO NOMEUSER
            const [userLT] = await connection.select('nomeUser', 'atividade').from('user').where({idUser: idLT});
            console.log('LT: ' + userLT.nomeUser);

            //PEGANDO NOME DO PROTETOR PELO ID
            const [userProtetor] = await connection.select('nomeUser').from('user').where({idUser: idUser});
            console.log('Protetor: ' + userProtetor.nomeUser);

            if(userLT.nomeUser !== "" && userLT.atividade === 'Ativo') {
                await connection('processo').insert({
                    idProcesso: idProcess, userName: userProtetor.nomeUser, userNameLT: userLT.nomeUser, dataAcordo:'', status: 'Em andamento', documento:'', 
                });
            }
            return res.status(201).json('Comentário realizado.');
        }
        catch (error) {
            return res.status(400).send(error);
        }
    },

    //ATUALIZAR PROCESSO
    async updateLT (req, res) {
        try {
            //REQUISIÇÕES
            const {idProcesso} = req.params;
            console.log(idProcesso);

            //PEGANDO DATA ATUAL
            var data = new Date();
            var dia = data.getDate();
            var mes = data.getMonth() + 1;
            var ano = data.getFullYear();
            var dataAcord;

            if(dia < 10) {
                dataAcord  = '0' + dia + '/' + mes + '/' + ano
              if(mes < 10) {
                dataAcord  = '0' + dia + '/0' + mes + '/' + ano
              }
            }
            else if(mes < 10) {
                dataAcord  = dia + '/0' + mes + '/' + ano
              if(dia < 10) {
                dataAcord  = '0' + dia + '/0' + mes + '/' + ano
              }
            }
            else {
                dataAcord = dia + '/' + mes + '/' + ano
            }

            await connection('processo').update({
                dataAcordo: dataAcord, status: 'Concluído'
            }).where({idProcesso: idProcesso});
            return res.status(200);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    },

    //DELETAR PROCESSO
    async destroy (req, res) {
        try {
            //REQUISIÇÃO
            const {idProcesso} = req.params;
            console.log(idProcesso);
        
            const [verify] = await connection.select('status').from('processo').where({idProcesso:idProcesso});
            console.log(verify.status);

            if(verify.status !== 'Concluído') {
                console.log('aaaaa')
                await connection('processo').where({idProcesso:idProcesso}).del();
                return res.status(200);
            }
        }
        catch (error) {
            return res.status(400).send(error);
        }
    },

    //LISTAR TODOS OS PROCESSOS
    async indexAll (req, res) {
        try{
            const results = await connection('processo');
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },
}