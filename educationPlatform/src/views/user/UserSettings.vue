<script setup>
import {computed, onMounted, ref} from 'vue';
import {
  Plus, Upload
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import {
  userApplyTeacherService, userGetVerificationCode,
  userUpdateAvatarService,
  userUpdateInfoService,
  userUpdatePasswordService, userUpdatePhoneNumService
} from "@/api/user.js";
import {ElMessage} from "element-plus";
import moment from "moment/moment.js";
const userStore = useUserStore()
const lastLoginTime = ref('')
const upTime = ref('')
onMounted(() => {
  console.log(approval_status)
  lastLoginTime.value = localStorage.getItem('lastLoginTime') || '无记录'
  if (lastLoginTime.value && lastLoginTime.value !== '无记录' && moment(lastLoginTime.value).isValid()) {
    upTime.value = moment(lastLoginTime.value).format('YYYY-MM-DD HH:mm:ss')
  } else {
    upTime.value = '无记录'
  }
})
const {
  user: { id, username, nickname, email, gender, signature, phone_num, user_pic, approval_status },
    getUser
} = useUserStore()
const checkDifferent = (rule, value, callback) => {
  // 校验新密码和原密码不能一样
  if (value === passwordForm.value.oldPwd) {
    callback(new Error('新密码不能与原密码一样'))
  } else {
    callback()
  }
}
const checkSameAsNewPwd = (rule, value, callback) => {
  // 校验确认密码必须和新密码一样
  if (value !== passwordForm.value.newPwd) {
    callback(new Error('确认密码必须和新密码一样'))
  } else {
    callback()
  }
}
const basicInfoRules = ref({
  // 定义基础内容区域表单校验规则
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 1, max: 10, message: '用户名长度在 1 到 10 个字符', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9]+$/, message: '用户名只能包含字母和数字', trigger: 'blur' }
  ],
  nickname: [
    { min: 1, max: 20, message: '昵称长度在 1 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  gender: [
    { type: 'number', message: '性别类型必须是数字', trigger: 'change' },
    { validator: (rule, value, callback) => {
        if ([ -1, 0, 1 ].includes(value)) {
          callback();
        } else {
          callback(new Error('性别选择不正确'));
        }
      }, trigger: 'change' }
  ],
  signature: [
    { max: 200, message: '个性签名长度不能超过 200 个字符', trigger: 'blur' }
  ],
  tea_introduct: [
    { max: 3072, message: '介绍长度不能超过 3072 个字符', trigger: 'blur' }
  ]
})
const passwordRules = ref({
  // 定义密码校验规则
  oldPwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 12, message: '原密码长度在6-15位之间', trigger: 'blur' }
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 12, message: '新密码长度在6-15位之间', trigger: 'blur' },
    { validator: checkDifferent, trigger: 'blur' }
  ],
  rePwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 12, message: '确认密码长度在6-15位之间', trigger: 'blur' },
    { validator: checkSameAsNewPwd, trigger: 'blur' }
  ]
})
const phoneNumRules = ref({
  // 定义手机号校验规则
  newPhone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  // 定义验证码校验规则
  verificationCode: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码必须是6位数字', trigger: 'blur' }
  ]
})
const basicInfoForm = ref({
  id, username, nickname, email, gender, signature
})

const passwordForm = ref({
  oldPwd: '', newPwd: '', rePwd: ''
})

const phoneNumForm = ref({
  phone_num, newPhone: '', verificationCode: ''
})
const basicInfoFormRef = ref()
const passwordFormRef = ref()
const phoneNumFormRef = ref()
const imgUrl = ref(user_pic)
const uploadRef = ref()
// 将选择的图片转成base64格式并赋值给imgUrl
const onSelectFile = (uploadFile) => {
  // 基于 FileReader 读取图片做预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
// 上传头像按钮处理函数
const onUpdateAvatar = async () => {
  // 发送请求更新头像
  await userUpdateAvatarService(imgUrl.value)
  // userStore 重新渲染
  await userStore.getUser()
  // 提示用户
  ElMessage.success('头像更新成功')
}

// 手机号处理相关内容
const showDialog = ref(false)
const timeLeft = ref(0)
const formattedPhone = computed(() => {
  return phoneNumForm.value.phone_num.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})
const sendCode = async () => {
  // 验证手机号码是否合法填写
  try {
    await phoneNumFormRef.value.validateField('newPhone')
  } catch (err) {
    return ElMessage.error('请先正确填写的手机号！')
  }
  const phoneParams = { newPhone: phoneNumForm.value.newPhone }
  const res = await userGetVerificationCode(phoneParams)
  const code = res.data
  if (code.status === 0) {
    ElMessage.success(code.message)
    // 只是为了方便查看验证码，弹窗会消失（万一没记住验证码呢~）
    console.log(code.message)
    // 发送验证码逻辑
    timeLeft.value = 60
    let interval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        clearInterval(interval)
      }
    }, 1000)
  } else {
    ElMessage.error(code.data.message)
  }
}

const bindPhone = async () => {
  // 绑定手机号逻辑
  await phoneNumFormRef.value.validate()
  const { newPhone, verificationCode } = phoneNumForm.value
  const phoneParams = { newPhone, verificationCode }
  await userUpdatePhoneNumService(phoneParams)
  showDialog.value = false
  await userStore.getUser()
  ElMessage.success('手机号绑定成功')
}
// 提交修改按钮处理函数1
const submitForm1 = async () => {
  await basicInfoFormRef.value.validate()
  const { id, username, nickname, email, gender, signature } = basicInfoForm.value
  const basicInfoParams = { id, username, nickname, email, gender, signature }
  await userUpdateInfoService(basicInfoParams)
  await getUser()
  ElMessage.success('修改成功')
}
// 提交修改按钮处理函数2
const submitForm2 = async () => {
  await passwordFormRef.value.validate()
  const { id, oldPwd, newPwd } = passwordForm.value
  const pwdParams = { id, oldPwd, newPwd }
  await userUpdatePasswordService(pwdParams)
  await getUser()
  ElMessage.success('修改成功')
}
// 教师申请状态
const teacherApplicationStatus = ref('')
// 申请成为教师按钮
const applyTeacher = async () => {
  const params = { userId: basicInfoForm.value.id }
  const res = await userApplyTeacherService(params)
  // teacherApplicationStatus.value = 'pending'
  // teacherApplicationStatus.value = 'approved'
  // teacherApplicationStatus.value = 'rejected'
  const msg = res.data.message
  ElMessage.success(msg)
}
</script>
<template>
  <div class="settings-container">
    <el-form
        :rules="basicInfoRules"
        ref="basicInfoFormRef"
        :model="basicInfoForm"
        label-position="right"
        label-width="100px"
    >
      <!-- 基本资料区域 -->
      <div class="form-section">
        <div class="basic-top">
          <h2 class="section-title">基本资料</h2>
<!--          <span>上次登录时间 {{ upTime }}</span>-->
          <el-button text type="primary">上次登录时间：{{ upTime }}</el-button>
        </div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="basicInfoForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
              v-model="basicInfoForm.nickname"
              placeholder="请输入昵称"
              maxlength="20"
              show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="basicInfoForm.gender">
            <el-radio :label="-1">未知</el-radio>
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="basicInfoForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" prop="signature">
          <el-input
              v-model="basicInfoForm.signature"
              placeholder="请输入个性签名"
              maxlength="200"
              show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="上传头像">
          <el-row>
            <el-col :span="12">
              <el-upload
                  ref="uploadRef"
                  :auto-upload="false"
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-change="onSelectFile"
              >
                <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-col>
            <el-col :span="12" class="upload-buttons">
              <el-button
                  @click="uploadRef.$el.querySelector('input').click()"
                  type="primary"
                  :icon="Plus"
                  size="large"
              >选择图片</el-button>
              <el-button
                  @click="onUpdateAvatar"
                  type="primary"
                  :icon="Upload"
                  size="large"
              >上传头像</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
              @click="submitForm1"
              type="primary"
              size="large"
          >提交修改</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>
    </el-form>
      <!-- 修改密码区域 -->
    <el-form
        :rules="passwordRules"
        ref="passwordFormRef"
        :model="passwordForm"
        label-position="right"
        label-width="100px"
    >
      <div class="form-section">
        <h2 class="section-title">修改密码</h2>
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="passwordForm.oldPwd" type="password" placeholder="请输入原密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="passwordForm.newPwd" type="password" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePwd">
          <el-input v-model="passwordForm.rePwd" type="password" placeholder="请再次输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              @click="submitForm2"
              type="primary"
              size="large"
          >提交修改</el-button>
        </el-form-item>
        <el-divider></el-divider>
      </div>
    </el-form>

      <!-- 其他设置区域 -->
    <el-form
        :rules="phoneNumRules"
        ref="phoneNumFormRef"
        :model="phoneNumForm"
        label-position="right"
        label-width="100px"
    >
      <div class="form-section">
        <h2 class="section-title">其他设置</h2>
        <el-form-item label="手机号" required>
          <div class="phone-display">
            <span>{{ formattedPhone }}</span>
            <el-button text @click="showDialog = true" size="large" type="primary">修改</el-button>
          </div>
        </el-form-item>

        <!-- 绑定手机号对话框 -->
        <el-dialog
            v-model="showDialog"
            title="绑定手机号"
            width="30%"
            class="dialog_phone"
        >
          <el-form-item label="手机号" prop="newPhone">
            <el-input v-model="phoneNumForm.newPhone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verificationCode">
            <el-input v-model="phoneNumForm.verificationCode" placeholder="请输入验证码"></el-input>
            <el-button @click="sendCode" :disabled="timeLeft > 0">
              {{ timeLeft > 0 ? `${timeLeft}秒` : '发送验证码' }}
            </el-button>
          </el-form-item>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="bindPhone" size="large">
                绑定
              </el-button>
              <el-button @click="showDialog = false" size="large">取消</el-button>
            </span>
          </template>
        </el-dialog>
        <el-form-item label="成为教师" class="teacher-apply">
          <el-button v-if="!approval_status" type="danger" size="large" @click="applyTeacher">
            申请教师资格
          </el-button>
          <el-button v-else-if="approval_status === 'pending'" type="primary" size="large" disabled>
            已提交申请，请耐心等待
          </el-button>
          <el-button v-else-if="approval_status === 'rejected'" type="danger" size="large" @click="applyTeacher">
            重新申请教师资格
          </el-button>

          <div v-if="approval_status === 'pending'" class="pending">审核中。</div>
          <div v-else-if="approval_status === 'approved'" class="approved">
            <span class="iconfont icon-renzheng"></span>已通过教师认证
          </div>
          <div v-else-if="approval_status === 'rejected'" class="rejected">审核未通过。</div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.settings-container {
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  .teacher-apply {
    :deep(.el-form-item__content) {
      justify-content: space-between;
      .approved {
        display: flex;
        align-items: center;
        color: #6c9;
        span {
          font-size: 20px;
          color: #FFDD43;
        }
      }
      .pending, .rejected {
        color: #f56c6c;
      }
    }
  }
  .section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .basic-top {
    display: flex;
    justify-content: space-between;
    span {
      color: #66cc99;
      font-size: 14px;
    }
  }
}



:deep(.avatar-uploader) {
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    text-align: center;
  }
}

.upload-buttons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .el-button+.el-button {
    margin-left: 0;
  }
}

:deep(.phone-display) {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

:deep(.dialog_phone) {
  .el-input {
    flex: 1;
  }
}

:deep(.dialog-footer) {
  display: flex;
  justify-content: center;

  .el-button--large {
    width: 45vh;
  }
}

// 其他样式...
</style>
