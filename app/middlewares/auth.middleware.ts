import { Context, Next } from "koa";
import config from "../config";
import userService from "../service/user.service";
import { LoginParams } from "../types/auth.type";
import { ErrorType } from "../types/error.type";
import { md5password } from "../utils/password-handle";

const jwt = require('jsonwebtoken')

export const verifyLogin = async (ctx: Context, next: Next) => {
  //1.获取数据
  const { username, password } = ctx.request.body as LoginParams

  //2.判断用户名或者密码不能空
  if (!username || !password || username == null || password == null) {
    const error = new Error(ErrorType.UserNameOrPasswordEmpty)
    return ctx.app.emit('error', error, ctx)
  }

  //3.判断用户存不存在
  const result = await userService.getUserByName(username)
  if ((Array.isArray(result) && result.length === 0)) {
    const error = new Error(ErrorType.UserIsNotExists)
    return ctx.app.emit('error', error, ctx)
  } else if ((Array.isArray(result) && result.length > 0)) {
    //判断输入密码跟存入的密码是否一致
    const savePassword = (result[0] as LoginParams).password
    if (savePassword !== md5password(password)) {
      const error = new Error(ErrorType.PasswordIncorrect)
      return ctx.app.emit('error', error, ctx)
    }
    //把用户一些信息存到token里
    (ctx.request.body as LoginParams).id = (result[0] as LoginParams).id
  }

  await next()
}

//鉴权中间件，判断是否登陆
export const verifyAuth = async (ctx: Context, next: Next) => {
  const authrization = ctx.headers.authorization
  const token = authrization?.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, config.PUBLICK_KEY, {
      // algorithms:[]//default ['RS256', 'RS384', 'RS512']
    })
    ctx.userInfo = result
    console.log(result)
    await next()
  } catch (err) {
    console.log(err)
    const error = new Error(ErrorType.Unauthorization)
    ctx.app.emit('error', error, ctx)
  }


}