import connections from '../config/database'

class AuthService {
  async getPasswordByUser(username: string): Promise<string> {
    const statement = `
      select password from  users where username = ?
    `
    const result = await connections.execute(statement, [username])
    if (Array.isArray(result[0]) && result[0][0]) {
      return (result[0][0] as any).password
    }
    return ''
  }

}

export default new AuthService()