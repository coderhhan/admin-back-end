import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { Server } from 'http'

import config from './config'
import './config/database'
import handleError from './config/handle-error'
import Router from './router/index'

const { koaSwagger } = require('koa2-swagger-ui')
const swagger = require('./config/swagger')
const app = new Koa()
app.use(async (ctx, next) => {
  // 允许跨域的域名，* 代表所有域名都可以跨域访问
  ctx.set('Access-Control-Allow-Origin', '*');
  // 允许的请求方法
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // 允许的请求头字段
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (ctx.method === 'OPTIONS') {
    // 处理预检请求，直接返回 204 状态码，表示允许跨域访问
    ctx.status = 204;
  } else {
    // 继续处理正常请求
    await next();
  }

});
app.use(swagger.routes())
app.use(swagger.allowedMethods())
app.use(koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger.json',
  },
}))



app.use(bodyParser())
Router(app)
app.on('error', handleError)

const run = function (port: string | undefined = config.APP_PORT): Server {
  return app.listen(port, () => {
    console.log("服务器启动端口:" + port);
  })

}

export default run

module.exports = run