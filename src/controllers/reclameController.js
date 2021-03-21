const connection = require('../dataBase/dbConnection');

module.exports = {
    async store (req, res) {
        try {
            const {texto, email} = req.body;

            await connection('reclamacoes').insert({email, texto});
            return res.status(201).send();
        }
        catch(err) {
            return res.status(400).send(err);
        }   
    },

    async indexAll (req, res) {
        try{
            const results = await connection.select().from('reclamacoes');
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },
}