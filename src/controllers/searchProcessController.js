const connection = require('../dataBase/dbConnection');
const jwt = require('jsonwebtoken');

module.exports = {
        //LISTAR OS PROCESSOS EM ANDAMENTO DE UM LT 
        async indexLTEA (req, res) {
            try{
                //REQUISIÇÃO
                const {page} = req.query;
                const {id} = req.params;

                var a = JSON.stringify(id);
                const token = a.substring(1, a.length-1);
                const tokenDecode = jwt.decode(token);
                const idUser = tokenDecode.idUser;
    
                //PEGANDO NOMEUSER ATRAVÉS DO ID DO USUÁRIO
                const [nomeUser] = await connection.select('nomeUser').from('user').where({idUser:idUser});
                
                const results = await connection.select('idProcesso', 'userName', 'userNameLT', 'dataAcordo', 'status', 'documento').from('processo').where({userNameLT:nomeUser.nomeUser, 'status':'Em andamento'})
                /*.limit(12)
                .offset((p - 1) * 12)*/
            
                return res.json(results);  
            }
            catch (error){
                return res.status(404).send(error);
            }
        },

        //LISTAR OS PROCESSOS CONCLUÍDOS DE UM LT 
        async indexLTC (req, res) {
            try{
                //REQUISIÇÃO
                const {page} = req.query;
                const {id} = req.params;

                var a = JSON.stringify(id);
                const token = a.substring(1, a.length-1);
                const tokenDecode = jwt.decode(token);
                const idUser = tokenDecode.idUser;
    
                //PEGANDO NOMEUSER ATRAVÉS DO ID DO USUÁRIO
                const [nomeUser] = await connection.select('nomeUser').from('user').where({idUser:idUser});

                const results = await connection.select('idProcesso', 'userName', 'userNameLT', 'dataAcordo', 'status', 'documento').from('processo').where({userNameLT:nomeUser.nomeUser, 'status':'Concluído'})
                /*.limit(12)
                .offset((p - 1) * 12)*/

                return res.json(results);  
            }
            catch (error){
                return res.status(404).send(error);
            }
        },
    
        //LISTAR OS PROCESSOS DE UM PROTETOR
        async indexProtetor (req, res) {
            try{
                //REQUISIÇÃO
                const {page} = req.query;
                const {id} = req.params;

                var a = JSON.stringify(id);
                const token = a.substring(1, a.length-1);
                const tokenDecode = jwt.decode(token);
                const idUser = tokenDecode.idUser;
                
                //PEGANDO NOMEUSER PELO ID DO USUÁRIO
                const [nomeUser] = await connection.select('nomeUser').from('user').where({idUser:idUser});

                const results = await connection.select('idProcesso', 'userName', 'userNameLT', 'dataAcordo', 'status', 'documento').from('processo').where({userName:nomeUser.nomeUser})
                /*.limit(12)
                .offset((p - 1) * 12)*/

                return res.json(results);  
            }
            catch (error){
                return res.status(404).send(error);
            }
        },
}