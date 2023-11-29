import connections from '../config/database'
import type { UserInfo } from '../types/user.type'
class UserSerivce {
  async create(user: UserInfo) {
    const { username, password } = user
    const statement = `
    insert users (username,password) values (?,?);
    `
    const result = await connections.execute(statement, [username, password])
    return result
  }
  async getUserByName(name: string) {
    const statement = `
    select * from users where username = ?;
    `
    const result = await connections.execute(statement, [name])
    return result[0]
  }
  async getUserById(useId: number) {
    const statement = `
    select * from users where id = ?;
    `
    const result = await connections.execute(statement, [useId])
    return result[0]
  }
}

export default new UserSerivce()

