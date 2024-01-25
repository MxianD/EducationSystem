<script setup>
import {
  Document,
  Menu as IconMenu,
  Setting,
  Message, Edit, Operation, Upload, EditPen, Trophy, AlarmClock
} from '@element-plus/icons-vue'
import {computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router"
const router = useRouter()
const route = useRoute();
const isTeacher = ref(true)
// 计算属性，用于获取当前激活的菜单项
const activeMenuIndex = computed(() => {
  return route.path; // 返回当前路由的路径
});

const handleSelect = (key, keyPath) => {
  router.push(key); // 使用router.push来导航到选中的菜单项对应的路由
};

</script>

<template>
  <div class="common-layout" ref="container">
    <el-container>
      <el-aside width="200px">
        <el-menu
            ref="menu"
            background-color="#fff"
            class="el-menu-vertical-demo menu"
            :default-active="activeMenuIndex"
            text-color="#000"
            @select="handleSelect"
            router
        >
          <el-menu-item index="/user/profile/courses">
            <el-icon><icon-menu /></el-icon>
            <span>我的课程</span>
          </el-menu-item>
          <el-menu-item index="/user/profile/achievement">
            <el-icon><Trophy /></el-icon>
            <span>我的成就</span>
          </el-menu-item>
          <el-menu-item index="/user/profile/study_plan">
            <el-icon><AlarmClock /></el-icon>
            <span>学习计划</span>
          </el-menu-item>
          <el-menu-item index="/user/profile/messages">
            <el-icon><message /></el-icon>
            <span>我的消息</span>
          </el-menu-item>
          <el-menu-item index="/user/profile/settings">
            <el-icon><setting /></el-icon>
            <span>个人设置</span>
          </el-menu-item>
          <el-menu-item index="/user/profile/tests">
            <el-icon><edit /></el-icon>
            <span>我的测试</span>
          </el-menu-item>
          <el-menu-item index="/user/profile/tea_course" v-if="isTeacher">
            <el-icon><operation /></el-icon>
            <span>管理课程</span>
          </el-menu-item>
          <el-menu-item index="/user/profile/tea_test" v-if="isTeacher">
            <el-icon><upload /></el-icon>
            <span>发布测试</span>
          </el-menu-item>
          <el-menu-item index="/user/profile/tea_homework" v-if="isTeacher">
            <el-icon><edit-pen /></el-icon>
            <span>作业批改</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding-top: 0;
}
.menu {
  position: fixed;
  width: 12.5rem;
  height: 31.5rem;
}
</style>
