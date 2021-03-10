const connection = require('../dataBase/dbConnection')
const jwt = require('jsonwebtoken');

module.exports = {
    //LISTAR UM PROTETOR (PERFIL PRÓPRIO)
    async indexP (req, res) {
        try{
            //REQUISIÇÕES
            const {id} = req.params;
            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;

            const [results] = await connection.select('nome', 'nomeUser',/* imagem,*/ 'cidade', 'estado', 'complemento', 'atividade', 'opcaoTipoAnimal', 'opcaoSexo', 'ajudaEmergencia', 'opcaoAnimalEspecial', 'dividirDespesas', 'tamAnimal').from('user').where({idUser:idUser});
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },

    async indexLT (req, res) {
        try{
            //REQUISIÇÕES
            const {idLT} = req.params;
            
            const [results] = await connection.select('nome', 'nomeUser',/* imagem,*/ 'cidade', 'estado', 'complemento', 'atividade', 'opcaoTipoAnimal', 'opcaoSexo', 'ajudaEmergencia', 'opcaoAnimalEspecial', 'dividirDespesas', 'tamAnimal', 'ddd', 'numeroTel').from('user').where({idUser:idLT});
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },
}