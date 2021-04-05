// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'sql10.freesqldatabase.com',
      database: 'sql10403521',
      user:     'sql10403521',
      password: 'EH5h3ggx81',
      port: 3306,
    },
    migrations: {
      tableName: 'mig',
      directory: 'dataBase/mig'
    }
  }
}