<template>
  <div class="common-layout_1">
    <el-container>
      <el-main class="head-el-main">
        <el-card>
          <div class="box-card_1">
            <div class="head-card-left">
              <div class="course-image">
                <el-image
                  width="100%"
                  height="100%"
                  :src="courseCardImgUrl[0]"
                  fit="scale-down"
                />
              </div>
            </div>
            <div class="head-card-right">
              <div class="head-card-right-title">C语言程序设计进阶</div>
              <div class="head-card-right-time">
                <div class="head-card-right-time-1">
                  开课时间： 2023年11月13日 ~ 2024年01月31日
                </div>
                <div class="head-card-right-time-2">学时安排： 4-6小时每周</div>
                <div class="head-card-right-time-3"></div>
              </div>
              <div class="head-card-right-button">
                <el-button
                  type="success"
                  :icon="Check"
                  style="
                    width: 200px;
                    height: 60px;
                    font-size: large;
                    margin-left: 0px;
                  "
                  @click="learnCourse()"
                  >立即学习</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </el-main>
    </el-container>
    <div class="common-layout_2">
      <el-container class="detail-el-container">
        <el-main class="detail-el-main">
          <el-card class="box-card_2">
            <div>
              <el-container>
                <el-main>
                  <el-tabs
                    v-model="activeName"
                    class="tabs"
                    @tab-click="handleClick"
                  >
                    <el-tab-pane label="课程详细" name="course_details">
                      <div class="course-detail">
                        <div class="course-detail-introduction">
                          <div class="course-detail-title">课程概述</div>
                          <div class="course-detail-introduction-content">
                            课程以一个Windows下的图形游戏程序入手，借助一个C语言图形库，展开全部的教学内容。
                            作为计算机的基础语言，C语言有许多独特的地方。从1970年代诞生起，它的历史使命就是编写系统程序，它被设计成非常贴近底层、贴近硬件。它的很多独特的设计都是为了能够准确地反映硬件操作。但是历史又和C语言开了一个玩笑，它被当作了第一个通用型语言，曾经广泛地用于各种场合，解决各种问题。可是它之后的语言，再也没有像它那样贴近硬件，它们拿掉了那些硬件相关的东西，变得越来越远离底层了。
                            这门课，就是要告诉你C语言到底有哪些独特的地方，为什么能长期占据15%上下的编程语言份额。它是在前序课程——《程序设计入门-C语言》或《程序设计入门-Java语言》的基础上，让你完全掌握C语言本身的课程。
                            虽然我们会借助一个Windows下的图形库来展开教学内容，但是用C语言写Windows程序已经是过去式了，我们并不是要教大家如何用C语言来写Windows程序，只是借一下故事而已。
                          </div>
                        </div>
                        <div class="course-detail-outline">
                          <div class="course-detail-title">课程大纲</div>
                          <div class="course-detail-outline-content">
                            第1周：指针与字符串 1 指针的使用 2 指针运算 3
                            字符串操作 4 字符串函数的实现 第1周编程题
                            第2周：ACLLib的基本图形函数 ACLLib入门
                            第3周：结构类型 1 枚举 2 结构 3 联合 第4周：链表 1
                            可变数组 2 链表 第4周编程练习 第5周：程序结构 1
                            全局变量 2 编译预处理和宏 3 大程序结构
                            第6周：交互图形设计 1 图形程序的终端输入输出 2
                            函数指针及其应用 3 交互图形程序设计 4 游戏设计思路
                            第7周：文件 1 文件 2 位运算
                          </div>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="课程评价" name="course_comments">
                      课程评价
                    </el-tab-pane>
                  </el-tabs>
                </el-main>
              </el-container>
            </div>
          </el-card></el-main
        >
        <el-aside class="detail-el-aside">
          <el-card class="box-card_3">
            <div class="detail-aside">
            <div class="detail-aside-first">
              浙江大学
            </div>
            <div class="detail-aside-second">
              老师：翁恺
            </div>
            </div>
          </el-card></el-aside
        >
      </el-container>
    </div>
  </div>
</template>

<script setup name="CourseDetail">
import { reactive, toRefs, ref } from "vue";

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
  "C语言程序设计进阶",
  "高等数学（二）",
  '"互联网+"时代教师个人知识',
  "心理的进化",
  "科举与中国文化",
  "绩效管理",
  "东方电影",
  "树木学",
  "齐鲁小儿推拿",
  "特殊儿童语言康复",
  "建筑评论",
  "天文漫谈",
]);
let coursePublisherName = ref([
  "浙江大学",
  "国防科技大学",
  "爱课程",
  "西南大学",
  "湖南大学",
  "东北财经大学",
  "武汉大学",
  "北京林业大学",
  "山东中医药大学",
  "西南大学",
  "同济大学",
  "华中科技大学",
]);
let courseIntro = ref([
  "C语言程序设计进阶",
  "高等数学（二）",
  "教师互联网信息资源高效管理干货，助力提升教学、科研效率！",
  "男女择偶标准是怎么形成的？",
  "从唐朝到清朝，沉浸式体验古代科举考试",
  "企业管理者与HR提升绩效管理质量的必修课",
  "揭开东方电影的神秘面纱",
  "为什么银杏被叫做活化石？",
  "具有地域特色的小儿推拿术",
  "提升语言康复相关理论与实践素养，特教专业学生必学课程。",
  "如何科学理性地对建筑进行评论？",
  "太阳为什么被称为恒星？",
]);
//导航

const activeName = ref("first");

const handleClick = (tab, event) => {
  console.log(tab, event);
};
//消息弹出框
import { h } from 'vue'
import { ElMessage } from 'element-plus'

const learnCourse = () => {
  if (1) {//如果用户未登录
    ElMessage({
    message: h('p', null, [
      h('span', null, '请 '),
      h('span', { style: 'color: teal' }, '登录'),
    ]),
  })
  }
  
}
</script>

<style scoped>
/* 头部 */
.common-layout_1 {
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.head-el-main {
  display: flex;
  justify-content: center;
}
.box-card_1 {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.course-image {
  flex: 1;
  width: 90%;
}

.head-card-left {
  flex: 1;
}
.head-card-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.head-card-right-title {
  flex: 1;
  font-size: 25px;
  font-weight: bolder;
}
.head-card-right-time {
  flex: 4;
  display: flex;
  flex-direction: column;
}
.head-card-right-time-1 {
  flex: 1;
  color: rgba(153, 153, 153, 1);
  font-size: 13px;
}
.head-card-right-time-2 {
  flex: 1;
  color: rgba(153, 153, 153, 1);
  font-size: 13px;
}
.head-card-right-time-3 {
  flex: 4;
}
.head-card-right-button {
  flex: 3;
  display: flex;
  justify-items: center;
  align-items: center;
}

/* 课程详细 */
.common-layout_2 {
  display: flex;
  justify-content: center;
  width: 100%;
}
.detial-el-container {
}
::v-deep .common-layout_2 .el-container {
  /* 普通修改不起作用 */
  flex: unset;
  width: 85%;
}
.tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.detail-el-main {
  flex: 3;
  /* display: flex; */
  padding: 0px;
  margin-right: 30px;
}
/* 课程详细子模块 */
.course-detail {
  display: flex;
  flex-direction: column;
}
.course-detail-introduction {
  display: flex;
  flex-direction: column;
}
.course-detail-title {
  display: flex;
  font-size: 17px;
  font-weight: 600;
  flex: 1;
}
.course-detail-introduction-content {
  flex: 4;
  color: #5e6166;
  font-size: 12px;
  font-weight: 300;
  margin-top: 10px;
}
.course-detail-outline {
  display: flex;
  flex-direction: column;
}
.course-detail-outline-content{
  flex: 4;
  color: #5e6166;
  font-size: 12px;
  font-weight: 300;
  margin-top: 10px;
}
.detail-el-aside {
  flex: 1;
  /* display: flex; */
}

.detail-aside{
  display: flex;
  flex-direction: column;
}
.detail-aside-first{
  flex: 1;
}
.detail-aside-second{
  flex: 1;
}

</style>
