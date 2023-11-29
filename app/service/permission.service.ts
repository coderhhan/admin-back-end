import connections from '../config/database'
import { PermissionItem } from '../types/permission.type'
class PermissionService {

  async create(permission: PermissionItem) {
    const { parent_id, type, route_name, api_route_name, title } = permission
    const statement = `
      insert menu 
      (parent_id,type,route_name,api_route_name,title)
      values
      (?,?,?,?,?);
    `
    const result = await connections.execute(statement, [parent_id, type, route_name, api_route_name, title])
    return result
  }

  async update(id: string, permission: PermissionItem) {
    const { parent_id, type, route_name, api_route_name, title } = permission
    const statement = `
      update menu set parent_id = ?,type =?,route_name=?,api_route_name=?,title=? where id = ?;
    `
    const result = await connections.execute(statement, [parent_id, type, route_name, api_route_name, title, id])
    return result
  }


  async delete(id: string) {


    const statement2 = `
      delete  from  menu where id = ?;
    `


    const [result] = await connections.execute(statement2, [id])
    return result
  }

  async deleteMap(id: string) {
    const statement = `
    delete  from  role_menu_mapping where menu_id = ?;
  `
    const [result] = await connections.execute(statement, [id])
    return result
  }

  async getAllPermissions(userId: string) {
    const statement = `
      select * from menu 
    `
    const [result] = await connections.execute(statement, [userId])
    return result
  }

  async getPermissions(userId: string) {
    const statement = `
   select 
      distinct id,parent_id,type,route_name,api_route_name,title,sort 
   from 
    (select * from
      (select menu_id from user_role_mapping urm 
        right join (select * from users u where u.id = ?) t1 on  urm.user_id = t1.id
        left join roles r on r.id = urm.role_id
        right join role_menu_mapping rmm on rmm.role_id = r.id where r.id is not null) t2 
        left join menu m on m.id = t2.menu_id) t3  
      order by t3.sort asc ;
    `
    const [result] = await connections.execute(statement, [userId])
    return result
  }

  async deleteFromRolePermissionMapping(roleId: string) {
    const statement = `
      delete from role_menu_mapping where role_id = ?;
    `
    const [result] = await connections.execute(statement, [roleId])
    return result
  }

  async insertToRolePermissionMapping(roleId: string, data: Array<string>) {
    const tem = Array.from(new Set(data))
    const statement = `
      insert role_menu_mapping (menu_id,role_id) values 
      ${tem.map(() => {
      return '(?,?)'
    }).join(',')
      };
    `
    const insertValueArr = tem.map(item => [item, roleId]).reduce((pre, next) => {
      return [...pre, ...next]
    }, [])

    const result = await connections.execute(statement, insertValueArr)
    return result
  }


}

export default new PermissionService()