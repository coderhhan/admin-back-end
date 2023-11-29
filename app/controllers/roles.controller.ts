import { Context, Next } from "koa";
import rolesService from "../service/roles.service";
import { page } from "../types/common.type";
import { ErrorType } from "../types/error.type";
import { Role } from "../types/role.type";

class RolesController {
  async create(ctx: Context, next: Next) {
    const role = ctx.request.body
    const result = await rolesService.create(role as Role)
    ctx.body = {
      code: 200,
      data: result[0]
    }
  }
  async getById(ctx: Context, next: Next) {
    const { roleId } = ctx.params
    const result = await rolesService.getById(roleId)
    ctx.body = {
      code: 200,
      data: Array.isArray(result) ? result[0] : []
    }
  }
  async update(ctx: Context, next: Next) {
    const { roleId } = ctx.params
    const role = ctx.request.body as Role
    role.id = roleId
    const result = await rolesService.update(role as Role)
    ctx.body = {
      code: 200,
      data: result[0]
    }
  }
  async list(ctx: Context, next: Next) {
    console.log('jinlaile', ctx)
    const page: any = ctx.request.body
    const { data, total } = await rolesService.list(page as any)
    console.log(data)
    ctx.body = {
      code: 200,
      data,
      total
    }
  }

  async delete(ctx: Context, next: Next) {
    const { roleId } = ctx.params
    const IsroleUsed = await rolesService.roleIsUsed(roleId)
    if (IsroleUsed) {
      const error = new Error(ErrorType.RoleIsInUsed)
      ctx.app.emit('error', error, ctx)
    } else {
      const result = await rolesService.delete(roleId)
      ctx.body = {
        code: 200,
        data: result
      }
    }
  }

  async assignRole(ctx: Context, next: Next) {
    const { userId } = ctx.params
    const { rolesId } = ctx.request.body as any
    //先删除映射表里查询是已有数据

    await rolesService.deleteFromRoleUserMapping(userId)
    if (Array.isArray(rolesId) && rolesId.length > 0) {
      const [result] = await rolesService.insertToRoleUserMapping(userId, rolesId)
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

export default new RolesController()