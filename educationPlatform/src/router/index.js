import { createRouter, createWebHashHistory } from 'vue-router'
// 1. 定义路由组件.
// 也可以从其他文件导入
const routes = [
  { path: '/login', component: () => import('@/views/login/Login.vue') },
  { path: '/', component: () => import('@/views/layout/LayoutContainer.vue'),
      children: [
        { path: '', redirect: '/home'},
        { path: 'home', component: () => import('@/views/home/Home.vue') },
        { path: 'community', component: () => import('@/views/discussion/Discussion.vue') },
        { path: 'courses', component: () => import('@/views/course/CourseList.vue') },
        { path: 'courses/:id', component: () => import('@/views/course/CourseDetail.vue') },
        { path: 'user/profile',
          component: () => import('@/views/user/UserProfile.vue'),
          meta: { requiresAuth: true },
          children: [
            { path: '', redirect: '/user/profile/courses' },
            { path: 'settings', component: () => import('@/views/user/UserSettings.vue') },
            { path: 'courses', component: () => import('@/views/user/UserCourse.vue') },
            { path: 'study_plan', component: () => import('@/views/user/UserStudyPlan.vue') },
            { path: 'achievement', component: () => import('@/views/user/UserAchievement.vue') },
            { path: 'messages', component: () => import('@/views/user/UserMessage.vue') },
            { path: 'tests', component: () => import('@/views/user/UserTest.vue') },
            { path: 'tea_course', component: () => import('@/views/teacher/TeacherCourse.vue') },
            { path: 'tea_test', component: () => import('@/views/teacher/TeacherTest.vue') },
            { path: 'tea_homework', component: () => import('@/views/teacher/TeacherHomework.vue') }
          ]
        }
      ]
    },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

export default router