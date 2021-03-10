
exports.up = knex => knex.schema.createTable('user', table => {
    //PARTE DO PROTETOR/USUÁRIO
    table.string('idUser').primary()
    table.string('nomeUser', 10).notNullable().unique()
    table.string('senha', 100).notNullable()
    table.string('email', 50).notNullable().unique()
    table.string('dataNascimento', 10).notNullable() //deixar só data
    table.binary('imagem') //.notNullable
    table.integer('ddd', 2).notNullable()
    table.integer('numeroTel', 9).notNullable()
    table.string('nome', 30).notNullable()
    table.string('cidade', 30).notNullable()
    table.string('bairro', 30).notNullable()
    table.string('estado', 2).notNullable()
    table.string('complemento', 30).notNullable()

    //PARTE LT
    table.string('opcaoTipoAnimal', 50).notNullable() //CÃO, GATO, OUTROS
    table.string('opcaoSexo', 50).notNullable() //FÊMEA OU MACHO
    table.string('ajudaEmergencia', 50).notNullable() //SIM OU NÃO
    table.string('opcaoAnimalEspecial', 50).notNullable() //SIM OU NÃO
    table.string('dividirDespesas', 50).notNullable() //SIM OU NÃO
    table.string('tamAnimal', 50) //.notNullable() //P M G
    table.string('atividade', 50).notNullable() // ativo ou desativo
})


exports.down = knex => knex.schema.dropTable('user')