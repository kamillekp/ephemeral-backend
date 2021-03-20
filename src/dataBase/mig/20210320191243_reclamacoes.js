exports.up = knex => knex.schema.createTable('reclamacoes', table => {
    table.string('texto')
    table.string('email')
})


exports.down = knex => knex.schema.dropTable('reclamacoes')