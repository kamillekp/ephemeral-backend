exports.up = knex => knex.schema.createTable('uploads', table => {
    table.string('idUser')
    table.string('name')
    table.integer('size')
    table.string('key')
    table.string('url')
})


exports.down = knex => knex.schema.dropTable('uploads')