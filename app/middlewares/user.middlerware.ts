
import { Context, Next } from "koa"
import userService from "../service/user.service"
import { ErrorType } from "../types/error.type"
import { UserInfo } from "../types/user.type"
import { md5password } from "../utils/password-handle"

export const verifyUser = async (ctx: Context, next: Next) => {
  //1.获取数据
  // const { username, password } = ctx.request.body as UserInfo
  const username = (ctx.request.body as UserInfo).username
  const password = (ctx.request.body as UserInfo).password
  //2.判断用户名或者密码不能空
  if (!username || !password || username == null || password == null) {
    const error = new Error(ErrorType.UserNameOrPasswordEmpty)
    return ctx.app.emit('error', error, ctx)
  }

  //3.判断这次注册的用户名有没有被注册过
  const result = await userService.getUserByName(username)
  if (Array.isArray(result) && result.length > 0) {
    const error = new Error(ErrorType.UserNameAlreadyExists)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

export const mergeUserProfile = async (ctx: Context, next: Next) => {
  //1.获取数据
  // const { username, password } = ctx.request.body as UserInfo
  const username = (ctx.request.body as UserInfo).username
  const password = (ctx.request.body as UserInfo).password
  //2.判断用户名或者密码不能空
  if (!username || !password || username == null || password == null) {
    const error = new Error(ErrorType.UserNameOrPasswordEmpty)
    return ctx.app.emit('error', error, ctx)
  }

  //3.判断这次注册的用户名有没有被注册过
  const result = await userService.getUserByName(username)
  if (Array.isArray(result) && result.length > 0) {
    const error = new Error(ErrorType.UserNameAlreadyExists)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}


export const handlePassword = async (ctx: Context, next: Next) => {
  //加密密码
  const { password } = ctx.request.body as UserInfo
  (ctx.request.body as UserInfo).password = md5password(password)
  await next()
}