<template>
  <el-row class="login-page" :style="{ '--login-bg-image': `url(${login_bg})` }">
    <el-col :span="9"></el-col>
    <el-col :span="6" class="form">
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="formModel.password"
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
              @click="login"
              class="button"
              type="primary"
              auto-insert-space
          >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            注册 →
          </el-link>
        </el-form-item>
        <div class="terms">
          登录即同意
          <el-link type="primary" :underline="false">《服务协议》</el-link>
          和
          <el-link type="primary" :underline="false">《隐私政策》</el-link>
        </div>
      </el-form>

      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
              v-model="formModel.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="formModel.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
              v-model="formModel.repassword"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              @click="register"
              class="button"
              type="primary"
              auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            ← 返回
          </el-link>
        </el-form-item>
        <div class="terms">
          注册即同意
          <el-link type="primary" :underline="false">《服务协议》</el-link>
          和
          <el-link type="primary" :underline="false">《隐私政策》</el-link>
        </div>
      </el-form>
    </el-col>
  </el-row>
</template>


<script setup name="Login">
import moment from 'moment'
import {userLoginService, userRegisterService} from "@/api/user.js"
import { User, Lock } from '@element-plus/icons-vue'
import {ref, watch} from 'vue'
import {ElMessage} from "element-plus"
import {useRouter} from "vue-router"
import {useUserStore} from "@/stores/index.js"
import login_bg from '@/assets/login_bg.jpg'
const isRegister = ref(true)
const form = ref()
const lastLoginTime = ref('')
// 注册
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 整个表单的校验规则
// 1.非空校验 required: true  message消息提示， trigger触发校验的时机 blur change
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur'},
    { pattern: /^\S{5,10}$/, message: '用户名必须是5-10位的非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,12}$/, message: '密码必须是 6-12位的非空字符串', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,12}$/, message: '密码必须是 6-12位的非空字符串', trigger: 'blur' },
    { validator: (rule, value, callback) => {
        if (!(value === formModel.value.password)) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
// 注册按钮处理函数
const register = async () => {
  try {
    await form.value.validate();
    // 发送注册请求并等待响应
    const response = await userRegisterService(formModel.value)
    // 根据服务端返回的 status 字段判断注册是否成功
    if (response.data.status === 0) {
      // status 为 0 表示成功
      ElMessage.success(response.data.message || '注册成功！')
      // isRegister 是一个响应式引用，控制注册表单的显示
      isRegister.value = true;
    } else {
      // status 不为 0 表示失败，使用服务端返回的消息显示错误
      ElMessage.error(response.data.message || '注册失败！')
    }
  } catch (error) {
    // 如果错误中有 response，说明是服务端返回的错误
    if (error.response) {
      // 请求已发送，但服务端返回了错误状态码，此时服务端应该提供了错误信息
      ElMessage.error(error.response.data.message || '注册失败！')
    } else if (error.request) {
      // 请求已发送，但没有收到服务端的响应
      ElMessage.error('无法连接到服务器')
    } else {
      // 设置请求时发生了其他错误，这种情况是不预期的错误
      ElMessage.error('请求失败')
    }
    // 打印错误详情至控制台，方便调试
    console.error('Registration error:', error)
  }
}
const userStore = useUserStore()
const router = useRouter()
// 添加记住我状态
const rememberMe = ref(false)
// 登录按钮处理函数
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  if (res.data.status === 0) {
    userStore.setToken(res.data.token)
    const formattedDate = moment(res.data.up_time).format('YYYY-MM-DD HH:mm:ss')
    const msg = `上次登录时间: ${formattedDate}`
    ElMessage.success(res.data.message)
    ElMessage.success(msg)
    // 保存当前登录时间到 localStorage
    localStorage.setItem('lastLoginTime', formattedDate)
    if (rememberMe.value) {
      localStorage.setItem('username', formModel.value.username)
      localStorage.setItem('password', formModel.value.password)
      localStorage.setItem('rememberMe', 'true')
    } else {
      // 如果用户未勾选记住我，清除本地存储中的凭据
      localStorage.removeItem('username')
      localStorage.removeItem('password')
      localStorage.removeItem('rememberMe')
    }
    await router.push('/');
  } else {
    ElMessage.error(res.data.message || '登录失败！');
  }
}

// 初始化时检查本地存储
const checkRememberMe = () => {
  const storedUsername = localStorage.getItem('username')
  const storedPassword = localStorage.getItem('password')
  const storedRememberMe = localStorage.getItem('rememberMe')
  // 检查是否有保存的登录时间
  const storedLastLoginTime = localStorage.getItem('lastLoginTime')
  if (storedLastLoginTime) {
    lastLoginTime.value = storedLastLoginTime
  } else {
    lastLoginTime.value = ''
  }
  if (storedUsername && storedPassword && storedRememberMe === 'true') {
    formModel.value.username = storedUsername
    formModel.value.password = storedPassword
    rememberMe.value = true
  } else {
    formModel.value.username = ''
    formModel.value.password = ''
    rememberMe.value = false;
  }
}

// 当注册或登录表单被打开时执行检查
watch(isRegister, (newVal) => {
  // 重置表单
  formModel.value.username = ''
  formModel.value.password = ''
  formModel.value.repassword = ''
  if (newVal) {
    // 如果是切换回登录页面，检查并填充凭据
    checkRememberMe()
  } else {
    // 如果是切换到注册页面，清除记住我状态
    rememberMe.value = false
  }
}, { immediate: true })

</script>



<style lang="scss" scoped>
.login-page {
  background-image: var(--login-bg-image); // 使用 CSS 变量
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  .form {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    padding: 1.25rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .terms{
      display: flex;
      justify-content: center;
      font-size: 14px;
    }
  }
}
</style>
