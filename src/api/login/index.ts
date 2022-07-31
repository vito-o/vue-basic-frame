import { get } from '/@/plugins/request'
import { loginFormIntf } from '/@/types/login'

export async function login(ruleForm: loginFormIntf) {
  return await get('/api/login', ruleForm);
}

