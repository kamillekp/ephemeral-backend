const connection = require('../dataBase/dbConnection')
const bcrypt = require('bcrypt');
const crypto = require ('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
    //SALVAR PROTETOR
    async store (req, res) {
        try {
            //REQUISIÇÃO
            const {nomeUser, senha, email, dataNascimento,/* imagem,*/ ddd, numeroTel, nome, cidade, bairro, estado, complemento, atividade, opcaoTipoAnimal, opcaoSexo, ajudaEmergencia, opcaoAnimalEspecial, dividirDespesas} = req.body;
            console.log('entrou')

            //RETIRANDO '' DAS STRINGS
            var senha2 = JSON.stringify(senha);
            senha2 = senha2.substring(1, senha2.length-1);
    
            //ENCRIPTAÇÃO DA SENHA
            const salt = bcrypt.genSaltSync()
            const newSenha = bcrypt.hashSync(senha2, salt);

            //CRIANDO ID DO USUÁRIO
            const id = crypto.randomBytes(5).toString('HEX');
       
            await connection('user').insert({
                idUser: id, nomeUser, senha:newSenha, email, dataNascimento, imagem:'', ddd, numeroTel, nome, cidade, bairro, estado, complemento, atividade, opcaoTipoAnimal, opcaoSexo, ajudaEmergencia, opcaoAnimalEspecial, dividirDespesas, tamAnimal:''
            })
            return res.status(201).json(id);
        }        
        catch (error) {
            return res.status(400).send(error)
        }
    },

    //LISTAR TODOS OS PROTETORES
    async indexAll (req, res) {
        try{
            const results = await connection.select().from('user');
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },

    async indexSetting (req, res) {
        try {    
            //REQUISIÇÕES
            const {id} = req.params;
            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;

            const [results] = await connection.select(/*'nomeUser','email',*/ 'dataNascimento',/* imagem,*/ 'ddd', 'numeroTel', 'nome', 'cidade', 'bairro', 'estado', 'complemento').from('user').where({idUser:idUser});
                        
            return res.json(results);
        }
        catch (error){
            return res.status(404).send(error);
        }
    },

    //ATUALIZAR PROTETOR
    async update (req, res) {
        try {
            //REQUISIÇÕES
            const {id} = req.params;
            const {senha, dataNascimento, /*email, imagem*/ ddd, numeroTel, nome, cidade, bairro, estado, complemento} = req.body;
            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;

            //RETIRANDO '' DAS STRINGS
            var senha2 = JSON.stringify(senha);
            senha2 = senha2.substring(1, senha2.length-1);  
      
            //PEGANDO DO BANCO
            const [user] = await connection.select('senha').from('user').where({idUser:idUser});

            //VERIFICANDO SE SENHAS SÃO DIFERENTES
            if(bcrypt.compareSync(senha, user.senha) == 0 && senha != "") {
                console.log('Senhas diferentes')

                //HASH DA SENHA NOVA
                const salt = bcrypt.genSaltSync()
                const newSenha = bcrypt.hashSync(senha2, salt);
                
                await connection('user').update({
                    senha:newSenha, dataNascimento, /*email, imagem*/ ddd, numeroTel, nome, cidade, bairro, estado, complemento            
                }).where({idUser:idUser});   
            }
            else {
                console.log('Senhas iguais')

                await connection('user').update({
                    dataNascimento, /*email, imagem*/ ddd, numeroTel, nome, cidade, bairro, estado, complemento            
                }).where({idUser:idUser});
            }
            return res.status(200).json('OK Protetor');
        }
            
        catch (error) {
            return res.status(400).send(error);
        }
    },

    //DELETAR PROTETOR
    async destroy (req, res) {
        try {
            //REQUISIÇÃO
            const {id} = req.params;
            var a = JSON.stringify(id);
            const token = a.substring(1, a.length-1);
            const tokenDecode = jwt.decode(token);
            const idUser = tokenDecode.idUser;
            
            await connection.delete().from('user').where({idUser:idUser});
            return res.status(200).json('Delete feito');
        }
        catch (error) {
            return res.status(400).send(error);
        }
    },

    async teste1 (req, res) {
        const {nomeUser} = req.body;
        const nomeUsuario = await connection('user').select('nomeUser').where({nomeUser:nomeUser});
        console.log(nomeUsuario, nomeUser)
        
        if(nomeUsuario.length !== 0) {
            return res.json({status: true});
        }
        else if (nomeUsuario.length === 0) {
            return res.json({status: false});
        }
    },

    async teste2 (req, res) {
        const {email} = req.body;
        const emailUser = await connection('user').select('email').where({email:email});
        console.log(emailUser, email)

        if(emailUser.length !== 0) {
            return res.json({status: true});
        }
        else if (emailUser.length === 0) {
            return res.json({status: false});
        }
    },
}