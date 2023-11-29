import Router from "koa-router"
import authController from "../controllers/auth.controller"
import { verifyLogin } from "../middlewares/auth.middleware"
const router = new Router({ prefix: '/auth' })

router.post('/login', verifyLogin, authController.login)

router.post('/logout', authController.logout)
module.exports = router