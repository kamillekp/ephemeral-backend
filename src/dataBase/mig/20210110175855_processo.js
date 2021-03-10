
exports.up = knex => knex.schema.createTable('processo', table => {
    table.string('idProcesso').primary()
    table.string('idUser')    
    table.string('userName', 10).notNullable() //pegar pelo idProtetor
    table.string('userNameLT', 10).notNullable()//informado pelo protetor
    table.string('dataAcordo', 10).notNullable() //deixar só data
    table.string('status', 12).notNullable() //concluído ou em andamento, precisa de aceitação
    table.binary('documento') //.notNullable //upload do arquivo, após salvo, permitir download
    table.foreign('idUser').references('user.idUser')
        .onUpdate('CASCADE')
})


exports.down = knex => knex.schema.dropTable('processo')