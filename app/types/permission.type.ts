

export enum PermissionType {
  Menu = 1,
  Action
}

export interface PermissionItem {
  id?: number
  parent_id: number
  type: PermissionType
  route_name: string
  api_route_name: string
  title: string,
  sort?: number
}

// export interface TreeConstructor<T> {
//   children: Array<T>
//   permission?: Array<T>
// }

export interface TreeConstructor<T> extends PermissionItem {
  children: Array<T>
  permissions?: Array<T>
}