
<template>
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"  autocomplete="off" style="width: 300px;"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" style="width: 300px;"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { loginFormIntf } from '/@/types/login'
import { login } from '/@/api/login'

const router = useRouter()
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<loginFormIntf>({
  username: '',
  password: '',
})

const validateName = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名！'))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if(!formEl) return;

  formEl.validate(valid => {
    if(valid) {
      login({...ruleForm}).then(res => {
        sessionStorage.setItem('token', res.data.token);
        router.push({name: 'layout'})
      })
    } else {
      console.log('error submit!')
    }
  })
}


</script>

<style scoped>

</style>
