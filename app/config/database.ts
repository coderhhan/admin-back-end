
import mysql from 'mysql2'
import config from '.'

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_ROOT,
  password: config.MYSQL_PASSWORD
})

connections.getConnection((err, con) => {
  con.connect((err) => {
    if (err) {
      console.log('连接失败')
    } else {
      console.log('连接成功')
    }
  })

})

export default connections.promise()

