export enum ErrorType {
  UserNameOrPasswordEmpty = 'username or password empty',
  UserNameAlreadyExists = 'username already exists',
  UserIsNotExists = 'user is not exists',
  PasswordIncorrect = 'password incorrect',
  Unauthorization = 'unatuhorization',

  RoleNameIsEmpty = 'rolename is empty',
  RoleIsInUsed = 'role is in used',

  ParentIdIsEmpty = 'parent_id is null',
  RouteNameIsEmpty = 'route name is empty',
  TitleIsEmpty = 'title name is empty',

  NoPermission = 'no permission'
}