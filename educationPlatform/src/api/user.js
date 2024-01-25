import request from '@/utils/request.js'

// 注册接口
export const userRegisterService = ({ username, password }) => request.post('/api/reguser', { username, password })
// 登录接口
export const userLoginService = ({ username, password }) => request.post('/api/login', { username, password })
// 获取用户基本信息
export const userGetInfoService = () => request.get('/my/userinfo')
// 更新用户基本信息
export const userUpdateInfoService = ({ id, username, nickname, email, gender, signature }) => request.post('/my/userinfo', { id, username, nickname, email, gender, signature })
// 更新用户头像
export const userUpdateAvatarService = (avatar) => request.post('/my/update/avatar', { avatar })
// 更新用户密码
export const userUpdatePasswordService = ({ oldPwd, newPwd }) => request.post('/my/updatepwd', { oldPwd, newPwd })
// 获取验证码接口
export const userGetVerificationCode = query => request.get(`/my/send/verificationCode`, {params: query})
// 更新手机号码
export const userUpdatePhoneNumService = data => request.post('/my/update/bindPhoneNum', data)
// 申请成为教师
export const userApplyTeacherService = data => request.post('/my/apply/teacher', data)
