
exports.up = knex => knex.schema.createTable('processo', table => {
    table.string('idProcesso').primary()
    table.string('userName').notNullable() //pegar pelo idProtetor
    table.string('userNameLT').notNullable()//informado pelo protetor
    table.string('dataAcordo').notNullable() //deixar só data
    table.string('status').notNullable() //concluído ou em andamento, precisa de aceitação
    table.binary('documento') //.notNullable //upload do arquivo, após salvo, permitir download
})


exports.down = knex => knex.schema.dropTable('processo')