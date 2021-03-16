
exports.up = knex => knex.schema.createTable('user', table => {
    //PARTE DO PROTETOR/USUÁRIO
    table.string('idUser').primary()
    table.string('nomeUser').notNullable().unique()
    table.string('senha').notNullable()
    table.string('email').notNullable().unique()
    table.string('dataNascimento').notNullable() //deixar só data
    table.binary('imagem') //.notNullable
    table.integer('ddd').notNullable()
    table.integer('numeroTel').notNullable()
    table.string('nome').notNullable()
    table.string('cidade').notNullable()
    table.string('bairro').notNullable()
    table.string('estado').notNullable()
    table.string('complemento').notNullable()

    //PARTE LT
    table.string('opcaoTipoAnimal').notNullable() //CÃO, GATO, OUTROS
    table.string('opcaoSexo').notNullable() //FÊMEA OU MACHO
    table.string('ajudaEmergencia').notNullable() //SIM OU NÃO
    table.string('opcaoAnimalEspecial').notNullable() //SIM OU NÃO
    table.string('dividirDespesas').notNullable() //SIM OU NÃO
    table.string('tamAnimal') //.notNullable() //P M G
    table.string('atividade').notNullable() // ativo ou desativo
})


exports.down = knex => knex.schema.dropTable('user')