const connection = require('../dataBase/dbConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = "ellimak";

module.exports = {
    //LOGAR USER
    async store (req, res) {
        try {
            //REQUISIÇÃO
            const {nomeUser, senha} = req.body;
            console.log(nomeUser, senha);

            //PROCURANDO NOMEUSER NO BANCO
            const [nomeUserBanco] = await connection.select('nomeUser').from('user').where({nomeUser: nomeUser});

            if(nomeUser == nomeUserBanco.nomeUser) {
                //PROCURANDO SENHA NO BANCO
                const [senhaBanco] = await connection.select('senha').from('user').where({nomeUser: nomeUser});

                //COMPARANDO SENHAS
                if(bcrypt.compareSync(senha, senhaBanco.senha) == 1){
                    //PEGANDO IDUSER
                    const [user] = await connection.select('idUser', 'atividade').from('user').where({nomeUser: nomeUser});
                    console.log(user.idUser)

                    //INCIANDO TOKEN
                    const token = jwt.sign({idUser: user.idUser}, SECRET);
                    return res.status(200).json({token, auth: true, atividade: user.atividade});
                } 
                else {
                    return res.status(400).json('Erro ao logar');
                } 
            }
        } 
        
        catch (error) {
            return res.status(400).send(error);
        }
    },

    async verifyJWT (req, res, next) {
        const {id} = req.params;
        var a = JSON.stringify(id);
        const token = a.substring(1, a.length-1);
            
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err) return res.status(401).send(err);
            req.idUser = decoded.idUser;
            next();
        })
    }
}
