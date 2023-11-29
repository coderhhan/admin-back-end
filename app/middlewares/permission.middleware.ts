import { Context, Next } from "koa";
import permissionService from "../service/permission.service";
import { ErrorType } from "../types/error.type";
import { PermissionItem } from "../types/permission.type";

export const verifyPermissionParams = async (ctx: Context, next: Next) => {
  const { id, parent_id, type, route_name, api_route_name, title } = ctx.request.body as PermissionItem
  if (parent_id == null) {
    const error = new Error(ErrorType.ParentIdIsEmpty)
    ctx.app.emit('error', error, ctx)
    return
  }

  if (type == null) {
    const error = new Error(ErrorType.ParentIdIsEmpty)
    ctx.app.emit('error', error, ctx)
    return
  }

  if (!route_name) {
    const error = new Error(ErrorType.RouteNameIsEmpty)
    ctx.app.emit('error', error, ctx)
    return
  }

  if (api_route_name == null) {
    const error = new Error(ErrorType.ParentIdIsEmpty)
    ctx.app.emit('error', error, ctx)
    return
  }

  if (!title) {
    const error = new Error(ErrorType.TitleIsEmpty)
    ctx.app.emit('error', error, ctx)
    return
  }
  await next()
}

//检验权限
export const verifyPermissionAction = async (ctx: Context, next: Next) => {
  const userId = ctx.userInfo.id
  const method = ctx.request.method.toLocaleLowerCase()
  const currentApi = method + '@' + ctx.request.url.substring(1)
  const result = await permissionService.getPermissions(userId)
  if (Array.isArray(result)) {
    const flag = result.some((item) => {
      if ((item as PermissionItem).api_route_name === currentApi) {
        return true
      }
      return false
    })

    if (!flag) {
      const error = new Error(ErrorType.NoPermission)
      ctx.app.emit('error', error, ctx)
      return
    }

  }
  await next()
}