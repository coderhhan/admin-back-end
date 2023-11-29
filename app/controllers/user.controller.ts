
import service from '../service/user.service'
import { Context, Next } from 'koa'
import { UserInfo } from '../types/user.type'
import userService from '../service/user.service'
import permissionService from '../service/permission.service'
import { formatPermssionsForMenu } from '../utils/format-permission'
import { PermissionType } from '../types/permission.type'

class UserController {
  async create(ctx: Context, next: Next) {
    const body = ctx.request.body as UserInfo
    const user: UserInfo = { username: body.username, password: body.password }
    const result = await service.create(user)
    ctx.body = result
  }
  update(ctx: Context) {
    ctx.body = [2222, 2]
  }
  delete() {

  }
  get() {

  }
  list() {

  }
  async profile(ctx: Context, next: Next) {
    console.log(ctx.userInfo);
    const userId = ctx.userInfo.id
    const userInfo = await userService.getUserById(userId)
    const temp: any = await permissionService.getPermissions(userId)
    const result = formatPermssionsForMenu(temp)
    ctx.body = {
      code: 200,
      message: '操作成功',
      data: {
        ...userInfo,
        menus: result,
        routes: temp.filter(item => item.type === PermissionType.Menu),
        permissions: temp.filter(item => item.type === PermissionType.Action)
      }
    }
  } 
}

export default new UserController()