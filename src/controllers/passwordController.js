const connection = require('../dataBase/dbConnection');
const strNewPass = require ('./mailTemplate');
const bcrypt = require('bcrypt');
const crypto = require ('crypto');
const nodemailer = require('nodemailer');

module.exports = {
    async updateSenha (req, res) {
        try {
            const {email} = req.body;
            console.log(email);

            const senha = crypto.randomBytes(4).toString('HEX');

            const salt = bcrypt.genSaltSync()
            const newSenha = bcrypt.hashSync(senha, salt);

            const [user] = await connection.select('nome').from('user').where({email:email});

            const newPass = strNewPass.changePassword(user.nome, senha);

            await connection('user').update({
                senha:newSenha
            }).where({email:email});  
    
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                ignoreTLS: false,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: "app.ephemeral.v1@gmail.com", 
                  pass: "02150055" 
                },
                tls:{ rejectUnauthorized: true} //localhost
            });
            const info = await transporter.sendMail({
                from: '"Ephemeral" <app.ephemeral.v1@gmail.com>',
                to: `${email}, kamille.kpimentel@gmail.com, app.ephemeral.v1@gmail.com`,
                subject: `Solicitação de troca de senha`,
                text: "Nova senha", 
                html: `${newPass}`, // salvo em src/mailTemplate
                });

            return res.json(newPass);
        }
        catch(err) {
            return res.status(400).send(err);
        }   
    },
}