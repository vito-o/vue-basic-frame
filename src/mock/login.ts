import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: {
          msg: '登录成功',
          success: true,
          token: 'admin'
        }
      }
    }
  }
] as MockMethod[]