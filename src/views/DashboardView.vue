<template>
  <div class="dashboard-container">
    <div class="header-section">
      <div>
        <h1 class="welcome-text">Quản Lý Chứng Thực Hợp Đồng ✍️</h1>
        <p class="sub-text">Hệ thống lưu trữ bằng chứng số trên Blockchain</p>
      </div>
      <el-button type="primary" size="large" color="#1A365D" @click="goToCreate">
        + Thêm Hợp Đồng Mới
      </el-button>
    </div>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="8">
        <StatCard title="Hợp đồng đã ký" value="12" color="#2563EB">
          <template #icon><el-icon><DocumentChecked /></el-icon></template>
        </StatCard>
      </el-col>
      <el-col :span="8">
        <StatCard title="Đang chờ xử lý" value="3" color="#F59E0B">
          <template #icon><el-icon><Timer /></el-icon></template>
        </StatCard>
      </el-col>
      <el-col :span="8">
        <StatCard title="Đối tác đã tra cứu" value="45" color="#10B981">
          <template #icon><el-icon><View /></el-icon></template>
        </StatCard>
      </el-col>
    </el-row>

    <div class="recent-activity mt-20">
      <h3>Nhật ký hệ thống</h3>
      <el-card>
        <el-timeline>
          <el-timeline-item timestamp="10:00 AM" placement="top" type="primary">
            <el-tag size="small">Lưu trữ</el-tag> Đã đưa hợp đồng <b>HĐ-2026/001</b> lên Blockchain
          </el-timeline-item>
          <el-timeline-item timestamp="09:30 AM" placement="top" type="success">
            <el-tag type="success" size="small">Tra cứu</el-tag> Đối tác XYZ vừa kiểm tra tính toàn vẹn
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import StatCard from '../components/common/StatCard.vue';
import { DocumentChecked, View, Timer } from '@element-plus/icons-vue'; // Nhớ import icon mới
import { useRouter } from 'vue-router';
const router = useRouter();
const goToCreate = () => router.push('/create');
</script>

<style scoped>
.dashboard-container { padding: 30px; }
.header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.welcome-text { font-size: 24px; color: #1A365D; margin: 0; }
.sub-text { color: #64748B; margin: 5px 0 0 0; }
.mt-20 { margin-top: 20px; }
</style>