const connection = require('../dataBase/dbConnection');
const jwt = require('jsonwebtoken');

module.exports = {
    //LISTAR LT's POR E, C, B 
    async indexECB (req, res) {
        try{
            //REQUISIÇÃO
            const {page = 1} = req.query;
            const {estado, cidade, bairro} = req.query;
            const {id} = req.query;

            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;

            const results = await connection.select('idUser', 'nome', 'estado', 'cidade', 'user.atividade').from('user').where({'user.estado': estado, 'user.cidade': cidade, 'user.bairro': bairro, 'user.atividade': 'ativo'}).whereNot({idUser:idUser})
            /*.limit(4)
            .offset((page - 1) * 4)*/
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },

    //LISTAR LT's POR E, C, B 
    async indexEC (req, res) {
        try{
            //REQUISIÇÃO
            const {page = 1} = req.query;
            const {estado, cidade} = req.query;
            const {id} = req.query;
            
            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;
            
            const results = await connection.select('idUser', 'nome', 'estado', 'cidade', 'user.atividade').from('user').where({'user.estado': estado, 'user.cidade': cidade, 'user.atividade': 'ativo'}).whereNot({idUser:idUser})
            /*.limit(4)
            .offset((page - 1) * 4)*/
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },

    //LISTAR LT's POR E, C, B 
    async indexE (req, res) {
        try{
            //REQUISIÇÃO
            const {page = 1} = req.query;
            const {estado} = req.query;
            const {id} = req.query;

            console.log('oiii')
            console.log('Estado3: ', estado)
            console.log(id)
            
            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;
            
            const results = await connection.select('idUser', 'nome', 'estado', 'cidade', 'user.atividade').from('user').where({'user.estado': estado, 'user.atividade': 'ativo'}).whereNot({idUser:idUser})
            /*.limit(4)
            .offset((page - 1) * 4)*/
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },
}
