<template>
  <div class="guest-layout">
    <div class="brand">
      <div class="logo-circle">
        <el-icon><Connection /></el-icon>
      </div>
      <h1>NNC BLOCKCHAIN</h1>
    </div>

    <div class="guest-content">
      <slot />
    </div>

    <div class="footer-text">
      <p>© 2026 Powered by Polygon Network</p>
    </div>
  </div>
</template>

<script setup>
import { Connection } from '@element-plus/icons-vue';
</script>

<style scoped>
.guest-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F5F9; /* Màu nền xám sáng nhẹ */
  background-image: radial-gradient(#E2E8F0 1px, transparent 1px); /* Họa tiết chấm bi */
  background-size: 20px 20px;
}

.brand {
  text-align: center;
  margin-bottom: 30px;
}

.logo-circle {
  width: 60px;
  height: 60px;
  background: #1A365D;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-size: 30px;
  box-shadow: 0 4px 10px rgba(26, 54, 93, 0.3);
}

.brand h1 {
  color: #1A365D;
  font-size: 24px;
  margin: 0;
  font-weight: 800;
  letter-spacing: 1px;
}

.guest-content {
  width: 100%;
  max-width: 450px; /* Giới hạn chiều rộng cho đẹp */
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.footer-text {
  margin-top: 30px;
  color: #94A3B8;
  font-size: 13px;
}
</style>