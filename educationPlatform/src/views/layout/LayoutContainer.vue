
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="home-header" ref="header">
        <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
            router
        >
          <img
              src="@/assets/logo/%7B7DCF95A0-2923-C944-4151-60BB7BAA06BA%7D.png"
              alt="启思道"
          />
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/community">社区</el-menu-item>
          <el-menu-item index="/courses">课程</el-menu-item>
          <div class="flex-grow" />
          <!-- 搜索框 -->
          <transition name="slide-fade">
            <el-input
                v-if="showSearch"
                v-model="searchText"
                class="search-input"
                placeholder="搜索..."
                @blur="hideWhenEmpty"
                @keyup.enter="handleKeyUp"
            />
          </transition>
          <!-- 圆形的搜索按钮 -->
          <el-button
              class="search-button"
              round
              :icon="Search"
              @click="toggleSearch"
          >
            搜索
          </el-button>
          <!-- 登录/用户头像 -->
          <template v-if="!isUserLoggedIn">
            <el-button text type="primary" @click="login" class="login-btn">登录</el-button>
          </template>
          <el-dropdown v-else @command="dropdownCommand" trigger="hover">
            <span class="el-dropdown__box">
              <el-avatar :src="userStore.user.user_pic || avatar" />
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User">
                  <span>用户中心</span>
                </el-dropdown-item>
                <el-dropdown-item command="logout" :icon="SwitchButton">
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </el-menu>
      </el-header>
<!--      <el-main class="main" :style="{ 'min-height': mainHeight }">-->
      <el-main class="main" :style="{ 'min-height': minHeight }">
        <router-view></router-view>
      </el-main>
      <el-footer class="footer" ref="footer">
        <el-row class="footer-link">
          <el-col :span="2"><a href="javascript:void(0);">关于我们</a></el-col>
          <el-col :span="2"><a href="javascript:void(0);">联系方式</a></el-col>
          <el-col :span="2"><a href="javascript:void(0);">帮助中心</a></el-col>
        </el-row>
        <el-divider />
        <div class="footer-copy">
          <small>Copyright © 2024 querypath.cn 吉ICP备2020100536号</small>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup name="LayoutContainer">
import {
  CaretBottom, SwitchButton, User
} from '@element-plus/icons-vue'
import {nextTick, onBeforeUnmount, onMounted, onUpdated, ref} from 'vue'
import {Search} from "@element-plus/icons-vue"
import { useUserStore } from "@/stores"
import {ElMessageBox} from "element-plus"
import { useRouter } from "vue-router"
import avatar from '@/assets/default.png'
const router = useRouter()
const isUserLoggedIn = ref(false) // 用户登录状态
const showSearch = ref(false) // 控制搜索框显示
const searchText = ref('') // 搜索框绑定的文本
const userStore = useUserStore()
onMounted(async () => {
  // 从存储或状态管理中获取 token
  const token = userStore.token
  if (token) {
    // 调用 userStore 中的 checkToken 方法
    const isValidToken = await userStore.checkToken()

    if (isValidToken) {
      // 如果 token 有效，设置登录状态为 true
      isUserLoggedIn.value = true
      await userStore.getUser() // 获取并设置用户信息
    } else {
      // 如果 token 无效，设置登录状态为 false
      isUserLoggedIn.value = false
      // 可能需要清理掉无效的 token
      userStore.removeToken()
    }
  }
})
// 处理菜单项选择
const handleSelect = (index, indexPath) => {
  console.log('Selected menu index:', index, 'Path:', indexPath)
};

// 切换搜索框的显示
const toggleSearch = () => {
  showSearch.value = !showSearch.value
};

// 执行搜索逻辑
const performSearch = () => {
  if (searchText.value.trim() === '') {
    showSearch.value = false
  } else {
    console.log('Performing search for:', searchText.value);
    // 将搜索关键字添加到 URL 的 Query 参数中
    router.push({ path: '/search', query: { keywords: searchText.value } })
  }
}
// 当按下回车键，执行搜索操作
const handleKeyUp = (event) => {
  if (event.key === 'Enter') {
    performSearch()
  }
}
// 当搜索框失去焦点时，检查是否为空，若为空则隐藏搜索框
const hideWhenEmpty = () => {
  if (searchText.value.trim() === '') {
    showSearch.value = false
  }
};

// 登录逻辑
const login = () => {
  // 判断用户是否已经登录
  if (!isUserLoggedIn.value) {
    // 如果用户未登录，则跳转到登录页面
    router.push('/login')
  }
};
// 下拉菜单的逻辑
const dropdownCommand = async command => {
  if (command === 'profile') {
    router.push('/user/profile')
  } else if (command === 'logout') {
    await logout();
  }
}
// 退出登录逻辑
const logout = async () => {
  await ElMessageBox.confirm('你确认要退出登录吗？','温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  userStore.removeToken()
  userStore.setUser({})
  localStorage.removeItem('username')
  localStorage.removeItem('password')
  localStorage.removeItem('rememberMe')
  localStorage.removeItem('lastLoginTime')
  isUserLoggedIn.value = false
  router.push('/login')
}
// 通过dom的offsetHeight属性来获取元素实际渲染的高度：
const header = ref(null)
const footer = ref(null)
const minHeight = ref('')

onMounted(() => {
  calcMinHeight()
  window.addEventListener('resize', calcMinHeight)
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', calcMinHeight)
});
onUpdated(() => {
  calcMinHeight()
});

const calcMinHeight = async () => {
  await nextTick();

  if (header.value && footer.value) {
    const viewportHeight = window.innerHeight
    const headerHeight = header.value.$el.clientHeight
    const footerHeight = footer.value.$el.clientHeight

    minHeight.value = `${viewportHeight - headerHeight - footerHeight}px`
  }
};
</script>

<style lang="scss" scoped>
.home-header {
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 2001;

  .flex-grow {
    flex-grow: 1;
  }

  .el-menu-demo {
    display: flex;
    align-items: center;
    img {
      height: 60px;
      cursor: pointer;
      user-select: none;  /* 防止图片内容被选中 */
      -webkit-user-select: none; /* Safari 浏览器 */
      -moz-user-select: none; /* Firefox 浏览器 */
      -ms-user-select: none; /* Internet Explorer/Edge 浏览器 */
    }
  }

  .el-dropdown__box {
    margin-right: 20px;
    display: flex;
    align-items: center;
    .el-icon {
      color: #999;
      margin-left: 10px;
    }
    &:active,
    &:focus {
      outline: none;
    }
  }
  .search-button {
    margin-right: 20px;
  }
  .search-input {
    max-width: 500px;
    @media (min-width: 1025px) {
      max-width: 500px;
    }

    @media (max-width: 1024px) {
      max-width: 400px;
    }

    @media (max-width: 768px) {
      max-width: 300px;
    }
    transition: width 0.5s ease-in;
    margin-right: 10px;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 1s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    width: 0;
    opacity: 0;
  }
  .login-btn {
    margin-right: 20px;
  }
}



.main {
  margin: 0 auto;
  @media (min-width: 1536px) {
    width: 1536px;
  }
  @media (max-width: 1536px) and (min-width: 1280px) {
    width: 1280px;
  }
  @media (max-width: 1280px) and (min-width: 1024px) {
    width: 1024px;
  }
  @media (max-width: 1024px) and (min-width: 768px) {
    width: 768px;
  }
  @media (max-width: 768px) and (min-width: 640px) {
    width: 640px;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
}
.footer {
  padding: 16px 0 14px;
  height: 100%;
  background-color: #222;
  text-align: center;
  .el-divider {
    margin: 16px auto 14px auto;
    color: #374050;
    width: 80%;
    border-top: #374050 solid 1px;
  }
  .footer-link {
    justify-content: center;
    margin: 0 auto;
    a {
      color: #fff;
      text-decoration: none;
    }
    a:hover {
      color: #6c9;
    }
  }
  .footer-copy {
    color: #fff;
  }
}

</style>
