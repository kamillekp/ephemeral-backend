
exports.up = knex => knex.schema.createTable('comentario', table => {
    table.string('idComentario').primary()
    table.string('idRemetente') //pra achar o userNameRemetente
    table.string('userNameRemetente', 10).notNullable()
    table.string('UserNameDestinatario', 10).notNullable() //informado pelo remetente
    table.string('texto', 300).notNullable() //enviar texto e idRemetente para comentariosRecebidos
    table.string('dataComent', 10).notNullable() //deixar só data
    table.foreign('idRemetente').references('user.idUser')
        .onUpdate('CASCADE')
})


exports.down = knex => knex.schema.dropTable('comentario')