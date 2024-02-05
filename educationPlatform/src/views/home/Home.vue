<template>
  <div>
    <div class="common-layout_1">
      <el-container height="400px">
        <el-aside width="200px" height="300px">
          <el-card>
            <div v-for="o in courseList" :key="o" class="text item">
              {{ o }}
            </div>
          </el-card>
        </el-aside>
        <el-main style="background-color: #fff">
          <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="item in 4" :key="item">
              <el-image
                width="100%"
                height="100%"
                :src="homeCarouselImgUrl[item - 1]"
                fit="scale-down"
              />
            </el-carousel-item>
          </el-carousel>
        </el-main>
        <el-aside width="200px" height="300px">
          <el-card class="box-card">
            <div>
              <el-avatar
                :size="70"
                :src="circleUrl"
                style="margin-bottom: 80px; margin-top: 35px"
              />
            </div>
            <div class="login-button">
              <el-button text type="success" bg @click="login()" :size="large"
                >登录</el-button
              >
            </div>
          </el-card>
        </el-aside>
      </el-container>
    </div>
    <!-- 课程展示栏 -->
    <div class="common-layout_2">
      <el-container>
        <el-header>
          <h1>推荐课程</h1>
        </el-header>
        <el-main>
          <el-row :gutter="20" v-for="e in 3" :key="e">
            <el-col v-for="o in 4" :key="o" :span="6"
              ><div class="grid-content">
                <router-link :to="{ name: 'CourseDetail', params: { id: 'erina' }}">
                  <el-card class="box-card">
                  <div class="course-image">
                    <el-image
                      width="100%"
                      height="100%"
                      :src="courseCardImgUrl[4*(e-1)+o-1]"
                      fit="scale-down"
                    />
                  </div>
                  <div class="text item course-info">
                    <div class="course-info-head">
                      <div class="course-info-head-text">{{courseName[4*(e-1)+o-1]}}</div>
                      <div class="course-info-head-publisherText">{{coursePublisherName[4*(e-1)+o-1]}}</div>
                    </div>
                    <div class="course-info-introduction">
                      <div class="course-info-card">{{courseIntro[4*(e-1)+o-1]}}</div>
                    </div>
                  </div>
                </el-card>
                </router-link>

              </div></el-col
            >
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref } from "vue";

const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  squareUrl:
    "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  sizeList: ["small", "", "large"],
});

const { circleUrl, squareUrl, sizeList } = toRefs(state);
let homeCarouselImgUrl = ref([
  new URL("@/assets/homeCarouselImg/1.jpg", import.meta.url).href,
  new URL("@/assets/homeCarouselImg/2.jpg", import.meta.url).href,
  new URL("@/assets/homeCarouselImg/3.png", import.meta.url).href,
  new URL("@/assets/homeCarouselImg/4.jpg", import.meta.url).href,
]);
//课程图片数据
let courseCardImgUrl = ref([
  new URL("@/assets/courseCard/1.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/2.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/3.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/4.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/5.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/6.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/7.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/8.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/9.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/10.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/11.jpg", import.meta.url).href,
  new URL("@/assets/courseCard/12.jpg", import.meta.url).href,
]);
//课程信息数据
let courseName = ref([
  'C语言程序设计进阶', '高等数学（二）', '"互联网+"时代教师个人知识', '心理的进化', '科举与中国文化', '绩效管理', '东方电影', '树木学', '齐鲁小儿推拿',
  '特殊儿童语言康复','建筑评论','天文漫谈',
])
let coursePublisherName = ref([
  '浙江大学', '国防科技大学', '爱课程', '西南大学', '湖南大学', '东北财经大学', '武汉大学', '北京林业大学', '山东中医药大学', '西南大学',
  '同济大学','华中科技大学',
])
let courseIntro = ref([
  'C语言程序设计进阶', '高等数学（二）', '教师互联网信息资源高效管理干货，助力提升教学、科研效率！', '男女择偶标准是怎么形成的？',
  '从唐朝到清朝，沉浸式体验古代科举考试', '企业管理者与HR提升绩效管理质量的必修课', '揭开东方电影的神秘面纱',
  '为什么银杏被叫做活化石？', '具有地域特色的小儿推拿术', '提升语言康复相关理论与实践素养，特教专业学生必学课程。',
  '如何科学理性地对建筑进行评论？', '太阳为什么被称为恒星？',
])


//课程选择
let courseList = ["国家精品", "认证学习", "计算机", "外语"];

// 登录逻辑
const login = () => {
  // 判断用户是否已经登录
  if (!isUserLoggedIn.value) {
    // 如果用户未登录，则跳转到登录页面
    router.push("/login");
  }
};

</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
}

.el-carousel__item:nth-child(2n + 1) {
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.box-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}
.login-button {
  display: flex;
  justify-content: center;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
/* 课程卡片样式 */
.course-image {
  flex: 1;
}
.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.course-info-head {
  flex: 5;
  display: flex;
  flex-direction: column;
}
.course-info-head-text {
  flex: 1;
  font-size: large;
  font-weight: bold;
}
.course-info-head-publisherText {
  flex: 1;
  color: #475669;
  font-size: small;
}
.course-info-introduction {
  flex: 1;
}
.course-info-card {
  background-color: rgba(248, 249, 251, 1);
  margin-top: 30px;
  color: rgba(153, 153, 153, 1);
  font-size: 11px;
  height: 50px;
  max-height: 50px;
  padding: 10px;
}
</style>
