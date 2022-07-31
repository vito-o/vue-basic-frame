
export interface UserQueryIntf {
  role: number
  nickName: string
  total: number
  current: number
  size: number
}

export interface UserIntf{
  id: number
  nickName: string
  userName: string
  role: RoleIntf[]
}

export interface RoleIntf{
  role: number
  roleName: string
}

export interface EditDialogIntf{
  show: boolean
  id: number
  nickName: string
  selectedRoles: number[]
}

export class UserInfo {
  query:UserQueryIntf = {
    role: 1,
    nickName: '',
    total: 0,
    current: 1,
    size: 10
  };

  users: UserIntf[] = [];


  editDialog: EditDialogIntf = {
    show: false,
    id: -1,
    nickName: '',
    selectedRoles: []
  }
} 

