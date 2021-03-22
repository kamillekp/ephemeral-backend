module.exports = {
    changePassword (firstName, password){
        const str = `<body style="position: relative; text-align:justify; width: 80%">
                        <h2>Sua nova senha</h2>
                        <p>Olá, ${firstName}</p>
                        <p>Uma nova senha foi solicitada para sua conta na plataforma Ephemeral. Acesse o site utilizando seu nome de usuário e: </p>
                        <p><b>${password}</b></p>
                    </body>`
        return str;
    }
}