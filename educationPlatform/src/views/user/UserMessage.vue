<script setup>

</script>

<template>
  <div class="notifications-container">
    <el-row>
      <el-col :span="24">
        <el-card class="notification-card" shadow="never">
          <div class="card-content">
            <h3 class="card-title">课程通知</h3>
            <div class="card-body">这里是通知的内容...</div>
            <div class="card-footer">2023-04-01 10:00</div>
          </div>
        </el-card>
        <el-card class="notification-card" shadow="never">
          <div class="card-content">
            <h3 class="card-title">考试通知</h3>
            <div class="card-body">这里是通知的内容...</div>
            <div class="card-footer">2023-04-01 10:00</div>
          </div>
        </el-card>
        <el-card class="notification-card" shadow="never">
          <div class="card-content">
            <h3 class="card-title">查看分数</h3>
            <div class="card-body">这里是通知的内容...</div>
            <div class="card-footer">2023-04-01 10:00</div>
          </div>
        </el-card>
        <el-card class="notification-card" shadow="never">
          <div class="card-content">
            <h3 class="card-title">回复通知</h3>
            <div class="card-body">这里是通知的内容...</div>
            <div class="card-footer">2023-04-01 10:00</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 重复 el-row 和 el-col 以显示更多通知 -->
  </div>
</template>

<style scoped>
.notifications-container {
  min-height: 75vh;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.notification-card {
  border: 1px solid #ebeef5;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    border-color: #c0c4cc;
  }
}

.card-content {
  padding: 15px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-body {
  margin-bottom: 12px;
  color: #606266;
}

.card-footer {
  text-align: right;
  color: #909399;
  font-size: 14px;
}
</style>
