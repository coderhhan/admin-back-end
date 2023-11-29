import Router from "koa-router"
import permissionController from "../controllers/permission.controller"
import { verifyAuth } from "../middlewares/auth.middleware"
import { verifyPermissionParams } from "../middlewares/permission.middleware"
const router = new Router({ prefix: '/permission' })


/**
 * @swagger
 * /permission:
 *   post: 
 *     description: 权限模块 
 *     tags: [权限模块] 
 *     summary: "新建权限"
 *     parameters:
 *       - name: parent_id
 *         description: 父级id
 *         required: true
 *         in: query
 *         type: string
 *       - name: type
 *         description: 权限类型
 *         in: query
 *         required: true
 *         type: number
 *       - name: route_name
 *         in: query
 *         description: 路由名称如AddRoles
 *         required: true
 *         type: string
 *       - name: api_route_name
 *         in: query
 *         description: 权限路径'post@roles'
 *         required: true
 *         type: string
 *       - name: title
 *         in: query
 *         description: 标题
 *         required: true
 *         type: string
 *       - name: sort
 *         in: query
 *         description: 标题
 *         required: true
 *         type: string
 *     produces: 
 *       - application/json 
 *     responses: 
 *       200:
 *         description: 获取数据列表 
 * */
router.post('/', verifyAuth, verifyPermissionParams, permissionController.create)

router.get('/', verifyAuth, permissionController.permissions)
router.get('/all', verifyAuth, permissionController.allPermissions)

router.delete('/:id', verifyAuth, permissionController.delete)
router.patch('/:id', verifyAuth, permissionController.update)

router.put('/:roleId', verifyAuth, permissionController.assignPermission) //给角色分配权限

module.exports = router 