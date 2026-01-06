<template>
  <el-aside width="250px" class="sidebar">
    <div class="logo-area">
      <h2>NNC RECEIPT</h2>
    </div>
    
    <el-menu
      default-active="/"
      class="el-menu-vertical"
      router
      background-color="#1A365D"
      text-color="#fff"
      active-text-color="#F59E0B"
    >
      <el-menu-item index="/">
        <span>Dashboard (Trang chủ)</span>
      </el-menu-item>
      
      <el-menu-item index="/create">
        <span>Tạo Phiếu Mới</span>
      </el-menu-item>

      <el-menu-item index="/history">
        <span>Lịch Sử</span>
      </el-menu-item>

      <el-menu-item index="/verify">
        <span>Kiểm Tra</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
// Tạm thời KHÔNG import icon để tránh lỗi
</script>

<style scoped>
.sidebar {
  background-color: #1A365D;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.logo-area {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.el-menu-vertical {
  border-right: none;
}
</style>