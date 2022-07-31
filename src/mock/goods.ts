import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/goodList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: "ok",
        'data|200-300': [{
          'id|+1': 1,
          'title': '@ctitle(3, 5)',
          'desc': '@cword(9, 18)',
          'userId|100-800': 100,
        }]
        
      }
    }
  }
] as MockMethod[]