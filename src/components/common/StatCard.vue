<template>
  <div class="stat-card">
    <div class="content">
      <p class="title">{{ title }}</p>
      <h3 class="value">{{ value }}</h3>
    </div>
    <div class="icon-box" :style="{ color: color, backgroundColor: bgHelper(color) }">
      <slot name="icon"></slot> </div>
  </div>
</template>

<script setup>
defineProps(['title', 'value', 'color'])

// Hàm tạo màu nền nhạt từ màu chính
const bgHelper = (hex) => hex + '20'; // Thêm độ trong suốt 20%
</script>

<style scoped>
.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-left: 4px solid; /* Viền màu bên trái */
  border-left-color: v-bind(color);
}
.title { color: #64748B; font-size: 14px; margin: 0 0 5px 0; }
.value { color: #1E293B; font-size: 24px; font-weight: bold; margin: 0; }
.icon-box {
  width: 45px; height: 45px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
}
</style>