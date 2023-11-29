import koaRouter from 'koa-router'
import userController from '../controllers/user.controller'
import { verifyAuth } from '../middlewares/auth.middleware'
import { verifyPermissionAction } from '../middlewares/permission.middleware'
import { handlePassword, verifyUser } from '../middlewares/user.middlerware'

const router = new koaRouter({
  prefix: "/users"
})

router.post('/', verifyAuth, verifyPermissionAction, verifyUser, handlePassword, userController.create)
router.delete('/', verifyAuth, verifyPermissionAction, userController.delete)
router.get('/profile', verifyAuth, userController.profile)

module.exports = router