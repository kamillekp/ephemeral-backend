
exports.up = knex => knex.schema.createTable('comentario', table => {
    table.string('idComentario').primary()
    table.string('userNameRemetente').notNullable()
    table.string('UserNameDestinatario').notNullable() //informado pelo remetente
    table.string('texto').notNullable() //enviar texto e idRemetente para comentariosRecebidos
    table.string('dataComent').notNullable() //deixar só data
})


exports.down = knex => knex.schema.dropTable('comentario')