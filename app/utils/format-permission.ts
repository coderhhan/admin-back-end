import { PermissionItem, PermissionType, TreeConstructor } from "../types/permission.type"

export const formatPermssionsForMenu = (arr: Array<TreeConstructor<PermissionItem>>) => {

  const map: any = {
  }
  arr.forEach((item) => {
    if (item.type === PermissionType.Menu) {
      item.children = []
      item.permissions = []
    }
    map[item.id as keyof typeof map] = item
  })

  arr.forEach(item => {
    if (item.parent_id !== 0) {
      const parent_id = item.parent_id
      if (item.type === 1) {
        map[parent_id].children.push(item)
      } else {
        map[parent_id].permissions.push(item)
      }
    }
  })

  const reuslt = arr.filter(item => {
    return item.parent_id === 0
  })
  console.log(reuslt.length)
  return reuslt.sort((a, b) => b.sort - a.sort)
}



export const formatPermssions = (arr: Array<TreeConstructor<PermissionItem>>) => {
  const map: any = {
  }
  arr.forEach((item) => {
    if (item.type === PermissionType.Menu) {
      item.children = []
    }
    map[item.id as keyof typeof map] = item
  })

  arr.forEach(item => {
    if (item.parent_id !== 0) {
      const parent_id = item.parent_id
      map[parent_id].children.push(item)
    }
  })

  const reuslt = arr.filter(item => {
    return item.parent_id === 0
  })
  return reuslt.sort((a, b) => b.sort - a.sort)
}