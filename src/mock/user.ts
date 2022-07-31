import { MockMethod } from 'vite-plugin-mock'

export const rules = [
  { role: 1, roleName: '用户' },
  { role: 2, roleName: '管理员' },
]

export default [
  {
    url: '/api/userList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: "ok",
        'data|30-40': [{
          'id|+1': 1,
          'nickName': '@cname',
          'userName': '@cname',
          'role': [{
            'role': '@pick([1, 2])',
            'roleName': function() {
              return rules.find(o => o.role == this.role).roleName
            }
          }],
        }]
        
      }
    }
  }
] as MockMethod[]