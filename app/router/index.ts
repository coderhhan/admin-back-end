import fs from 'fs'
import Koa from 'koa'
const useRouter = (app: Koa) => {

  fs.readdirSync(__dirname).forEach((file: any) => {
    if (file !== 'index.ts') {
      const router = require(`./${file}`)
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  });
}

export default useRouter