import { defineStore } from 'pinia'
import { ref } from "vue"
import {userGetInfoService} from "@/api/user.js";

// 用户模块
export const useUserStore = defineStore('user', () => {
			const token = ref('')
			const setToken = (newToken) => {
				token.value = newToken
			}
			const removeToken = () => {
				token.value = ''
			}
			const user = ref({})
			const getUser = async () => {
				const res = await userGetInfoService()
				user.value = res.data.data
			}
			const setUser = (obj) => {
				user.value = obj
			}
			// 新增的 checkToken 方法
			const checkToken = async () => {
				try {
					await getUser() // 调用 getUser 方法，如果没有抛出错误，则 token 有效
					return true // token 是有效的
				} catch (error) {
					return false // token 验证失败或请求出错
				}
			}
			return {
				token,
				setToken,
				removeToken,
				user,
				getUser,
				setUser,
				checkToken
			}
		},
		{
			persist: true
		})
