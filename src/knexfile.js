// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'sql10.freesqldatabase.com',
      database: 'sql10402236',
      user:     'sql10402236',
      password: 'ZThvds59Ms',
      port: 3306,
    },
    migrations: {
      tableName: 'mig',
      directory: 'dataBase/mig'
    }
  }
}