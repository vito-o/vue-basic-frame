import axios from 'axios'

export const service = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

service.interceptors.request.use(config => {
  config.headers = config.headers || {}

  config.headers.token = sessionStorage.getItem('token') || '';

  return config;
});

service.interceptors.response.use((res) => {
  if(res.data.code != '200') {
    return Promise.reject('接口请求失败')
  }
  return res.data;
})


export async function get(url: string, params?: object) {
  return await service.get(url, {
    params
  }); 
}

export async function post(url: string, data: object | undefined = {}) {
  return await service.post(url, data); 
}
