<script setup>
import { ref} from "vue";
import {
  FolderOpened
} from '@element-plus/icons-vue'
import courseImage10001 from '@/assets/courses/10001.png';
import courseImage10002 from '@/assets/courses/10002.png';
import courseImage10003 from '@/assets/courses/10003.png';
import courseImage10004 from '@/assets/courses/10004.png';
import {useRouter} from "vue-router";
const courses = ref([
  { id: 1, name: 'uni-app商城类app和小程序实战开发', image: courseImage10001 },
  { id: 2, name: 'uni-app商城类app和小程序实战开发', image: courseImage10001 },
  { id: 3, name: 'uni-app商城类app和小程序实战开发', image: courseImage10001 },
  { id: 4, name: 'uni-app多端企业网盘项目全栈开发', image: courseImage10002 },
  { id: 1, name: 'uni-app多端企业网盘项目全栈开发', image: courseImage10002 },
  { id: 2, name: 'uni-app多端企业网盘项目全栈开发', image: courseImage10002 },
  { id: 3, name: 'uni-app社区交友类app和小程序开发', image: courseImage10003 },
  { id: 4, name: 'uni-app社区交友类app和小程序开发', image: courseImage10003 },
  { id: 4, name: 'uni-app社区交友类app和小程序开发', image: courseImage10003 },
  // ...其他课程
]);
const router = useRouter()

const goToCourseDetails = (courseId) => {
  router.push(`/courses/${courseId}`)
}
</script>

<template>
  <div class="card-container">
    <el-row :gutter="20" v-if="courses.length > 0">
      <el-col :span="8" v-for="course in courses" :key="course.id">
        <!-- 使用 router-link 包裹 el-card -->
        <el-card @click="goToCourseDetails(course.id)" shadow="hover">
          <img :src="course.image" class="image" alt="课程图片" />
          <div class="bottom">
            <div class="course-name">
              <span>{{ course.name }}</span>
            </div>
            <div class="course-price">
              <span>￥9.98</span>
              <span>￥20.00</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div v-else class="empty-state">
      <el-icon>
        <folder-opened />
      </el-icon>
      <span>暂无课程</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  min-height: 75vh;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); // 添加阴影效果

  .el-row {
    margin: 0 auto;
  }

  .el-col {
    margin-bottom: 20px;
    .el-card {
      //box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      //transition: box-shadow 0.3s;
      cursor: pointer;
      //&:hover {
      //  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      //}
    }
    :deep(.el-card__body) {
      padding: 0;
      .image {
        width: 100%;
        height: 150px;
        display: block;
        object-fit: cover;
        border-radius: 4px;
      }
      .bottom {
        padding: 8px 24px 20px 24px;
        .course-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
          font-size: 14px;
        }
        .course-price {
          margin-top: 0.5rem;
          span {
            &:nth-child(1) {
              color: #F43F5E;
              font-weight: 700;
              font-size: 14px;
            }
            &:nth-child(2) {
              margin-left: 0.5rem;
              text-decoration-line: line-through;
              font-size: .75rem;
              line-height: 1rem;
              color: #6B7280;
            }
          }
        }
      }
    }


  }
  .empty-state {
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #c4c4c4;
    font-size: 2rem;

    .el-icon {
      font-size: 5rem;
      margin-bottom: 20px;
    }
  }
}
</style>
