const connection = require('../dataBase/dbConnection');

module.exports = {
    async store (req, res) {
        const {texto, email} = req.body;
        await connection('comentario').insert({email, texto});
        return res.status(201).json('Reclamação registrada.');
    }
}