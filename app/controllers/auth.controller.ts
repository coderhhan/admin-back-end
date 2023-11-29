import { Context, Next } from "koa";
import { LoginParams } from "../types/auth.type";
import config from "../config";
const jwt = require('jsonwebtoken')

class AuthController {
  login(ctx: Context, next: Next) {
    const body = ctx.request.body as LoginParams
    const user: LoginParams = { username: body.username, password: body.password, id: body.id }
    // 这里能拿到 颁发的token
    let expiresIn = Date.now() + 3600 * 24 * 30 //过期时间 单位：s
    const token = jwt.sign(user, config.PRIVATE_KEY, {
      expiresIn,
      // 指定加密算法 RS256=>非对称加密(安全,速度不及HS256) HS256=>对称加密(不及RS256安全,但速度快)默认
      algorithm: "RS256" //ˈælɡərɪðəm
    })
    ctx.body = {
      code: 200,
      data: { token, expiresIn }
    }
  }
  logout(){
    
  }

}

export default new AuthController()