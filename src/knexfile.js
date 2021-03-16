// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'sql10.freesqldatabase.com',
      database: 'sql10399407',
      user:     'sql10399407',
      password: 'DJwfZDkDLm',
      port: 3306,
    },
    migrations: {
      tableName: 'mig',
      directory: 'dataBase/mig'
    }
  }
}