// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'sql10.freesqldatabase.com',
      database: 'sql10401524',
      user:     'sql10401524',
      password: 'v4VRmRV5pb',
      port: 3306,
    },
    migrations: {
      tableName: 'mig',
      directory: 'dataBase/mig'
    }
  }
}