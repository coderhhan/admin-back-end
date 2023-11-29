import { Context, Next } from "koa"
import permissionService from "../service/permission.service"
import { PermissionItem, TreeConstructor } from "../types/permission.type"
import { formatPermssionsForMenu, formatPermssions } from "../utils/format-permission"

class PermissionController {
  async create(ctx: Context, next: Next) {
    const permission = ctx.request.body as PermissionItem
    const result = await permissionService.create(permission)
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async update(ctx: Context, next: Next) {
    const permission = ctx.request.body as PermissionItem
    const { id } = ctx.params
    const result = await permissionService.update(id, permission)
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async delete(ctx: Context, next: Next) {
    const { id } = ctx.params
    await permissionService.deleteMap(id)
    const result = await permissionService.delete(id)
    ctx.body = {
      code: 200,
      data: result
    }
  }

  async permissions(ctx: Context, next: Next) {
    const userId = ctx.userInfo.id
    const temp: any = await permissionService.getPermissions(userId)
    console.log(temp)
    const result = formatPermssionsForMenu(temp)
    ctx.body = {
      code: 200,
      data: result
    }
  }

  //所有的菜单
  async allPermissions(ctx: Context, next: Next) {
    const userId = ctx.userInfo.id
    const temp: any = await permissionService.getAllPermissions(userId)
    const result = formatPermssions(temp)
    ctx.body = {
      code: 200,
      data: result
    }
  }

  //分配菜单
  async assignPermission(ctx: Context, next: Next) {

    console.log(ctx.userInfo)
    const { roleId } = ctx.params
    const { permissionIds } = ctx.request.body as any
    await permissionService.deleteFromRolePermissionMapping(roleId)

    if (Array.isArray(permissionIds) && permissionIds.length > 0) {
      const [result] = await permissionService.insertToRolePermissionMapping(roleId, permissionIds)
      ctx.body = {
        code: 200,
        data: result
      }
      return
    } else {
      ctx.body = {
        code: 200,
        data: '操作成功'
      }
    }
  }

}

export default new PermissionController()