
import connections from '../config/database'
import { page } from '../types/common.type'
import { Role } from '../types/role.type'
class RolesService {

  async create(role: Role) {
    const { name, remarks } = role as Role
    const statement = `
      insert roles (name,remarks) values (?,?);
    `
    const result = await connections.execute(statement, [name, remarks])
    return result
  }

  //读取的时间时utc时间 表里时间类型timestamp 转成当地时间
  async getById(rolesId: number) {
    const statement = `
      select 
        roles.id id,
        date_format(roles.create_time,'%Y-%m-%d %H:%i:%s') createTime, 
        roles.name name,
        roles.remarks remarks
      from roles where id = ?;
    `
    const result = await connections.execute(statement, [rolesId])
    return result[0]
  }

  async update(role: Role) {
    const { name, remarks, id } = role as Role
    const statement = `
     update roles set name=?,remarks=? where id = ?;
    `
    const result = await connections.execute(statement, [name, remarks, id])
    return result
  }

  async list(page: page) {
    const { kw, currentPage, pageSize } = page
    const limit = pageSize
    const offset = currentPage * pageSize - pageSize

    const statement = `
     select * from roles where name like  '%${kw ? kw : ''}%' || remarks like  '%${kw ? kw : ''}%' limit ? , ?;
    `
    const statement2 = `
     select Count(*) total from roles where name like '%${kw ? kw : ''}%' || remarks like '%${kw ? kw : ''}%' ;
    `
    const result = await connections.execute(statement, [offset.toString(), limit.toString()])
    const result2 = await connections.execute(statement2, [])
    return { data: result[0], total: (result2[0] as any)[0].total }
  }
  async roleIsUsed(roleId: string) {
    const statement = ` 
      select * from user_role_mapping where role_id = ?;
    `
    const result = await connections.execute(statement, [roleId])
    if ((result[0] as any).length > 0) {
      return true
    } else {
      return false
    }

  }
  async delete(roleId: string) {
    const statement = `
      delete  from roles where  id = ?;
    `
    const statement2 = `
      delete  from role_menu_mapping where  role_id = ?;
    `
    const [result] = await connections.execute(statement, [roleId])
    //删除权限映射关系
    await connections.execute(statement2, [roleId])

    return result

  }

  async deleteFromRoleUserMapping(userId: string) {
    const statement = `
      delete  from user_role_mapping where user_id = ?;
    `
    const [result] = await connections.execute(statement, [userId])
    return result
  }

  async insertToRoleUserMapping(userId: string, rolesId: Array<string>) {
    const tem = Array.from(new Set(rolesId))
    const statement = `
      insert user_role_mapping (user_id,role_id) values 
      ${tem.map(() => {
      return '(?,?)'
    }).join(',')
      };
    `
    const insertValueArr = tem.map(item => [userId, item]).reduce((pre, next) => {
      return [...pre, ...next]
    }, [])

    const result = await connections.execute(statement, insertValueArr)
    return result
  }

}

export default new RolesService()