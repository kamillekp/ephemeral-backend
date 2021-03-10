const connection = require('../dataBase/dbConnection');
const jwt = require('jsonwebtoken');

module.exports = {
    async indexSetting (req, res) {
        try {    
            //REQUISIÇÕES
            const {id} = req.params;
            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;

            const [results] = await connection.select().from('user').where({idUser:idUser});
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },
    
    //ATUALIZAR LAR TEMPORÁRIO
    async update (req, res) {
        try {
            //REQUISIÇÕES
            const {id} = req.params;
            const {atividade, opcaoTipoAnimal, opcaoSexo, ajudaEmergencia, opcaoAnimalEspecial, dividirDespesas} = req.body;
            
            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;
            console.log(idUser)

            await connection('user').update({atividade, opcaoTipoAnimal, opcaoSexo, ajudaEmergencia, opcaoAnimalEspecial, dividirDespesas}).where({idUser:idUser});
                
            return res.status(200).json('OK lar temporário');
        }
        catch (error) {
            return res.status(400).send(error);
        }
    },
}