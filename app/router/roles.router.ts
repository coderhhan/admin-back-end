import Router from "koa-router"
import rolesController from "../controllers/roles.controller"
import { verifyAuth } from "../middlewares/auth.middleware"
const router = new Router({ prefix: '/roles' })


router.post('/', verifyAuth, rolesController.create)
router.get('/', rolesController.list)

router.get('/test', (ctx, next) => {
  ctx.body = {
    msg: 'cchengg'
  }
})

router.delete('/:id', verifyAuth, rolesController.delete)
router.patch('/:id', verifyAuth, rolesController.update)

router.get('/:id', verifyAuth, rolesController.getById)
router.put('/:userId', verifyAuth, rolesController.assignRole)

module.exports = router