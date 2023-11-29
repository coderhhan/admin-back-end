import { Context } from "koa"
import { ErrorType } from "../types/error.type"

const handleError = (error: Error, ctx: Context) => {
  let status: number = 1, body: any
  debugger

  switch (error.message) {
    case ErrorType.UserNameOrPasswordEmpty: {

      status = 400
      body = '用户名或密码不能为空'
      break
    }
    case ErrorType.UserNameAlreadyExists: {
      status = 200
      body = {
        code: 999,
        message: '用户名已存在'
      }
      break
    }
    case ErrorType.UserIsNotExists: {
      status = 200
      body = {
        code: 999,
        message: '用户不存在'
      }
      break
    }
    case ErrorType.PasswordIncorrect: {
      status = 200
      body = {
        code: 999,
        message: '密码不正确'
      }
      break
    }
    case ErrorType.Unauthorization: {
      status = 401
      body = {
        code: 401,
        message: '没有权限'
      }
      break
    }
    case ErrorType.RoleNameIsEmpty: {
      status = 200
      body = {
        code: 999,
        message: '角色名为空'
      }
      break
    }
    case ErrorType.RoleIsInUsed: {
      status = 200
      body = {
        code: 999,
        message: '该角色被使用，无法删除'
      }
      break
    }
    case ErrorType.ParentIdIsEmpty: {
      status = 200
      body = {
        code: 999,
        message: '父节点id不能为空'
      }
      break
    }
    case ErrorType.RouteNameIsEmpty: {
      status = 200
      body = {
        code: 999,
        message: '前端路由(操作名)不能为空'
      }
      break
    }
    case ErrorType.TitleIsEmpty: {
      status = 200
      body = {
        code: 999,
        message: '标题不能为空'
      }
      break
    }

    case ErrorType.NoPermission: {
      console.log(22)
      status = 403
      body = {
        code: 403,
        message: '没有该模块权限'
      }
      break
    }

  }
  ctx.status = status
  ctx.body = body
}

export default handleError