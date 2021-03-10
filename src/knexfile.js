// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'sql10.freesqldatabase.com',
      database: 'sql10397838',
      user:     'sql10397838',
      password: '4mB6JELv7u',
      port: 3306,
    },
    migrations: {
      tableName: 'mig',
      directory: 'dataBase/mig'
    }
  }
}