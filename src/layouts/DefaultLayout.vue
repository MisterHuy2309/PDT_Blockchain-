<template>
  <el-container class="layout-container">
    <div class="sidebar-wrapper hidden-xs-only">
      <Sidebar />
    </div>

    <el-container class="is-vertical">
      <Header />
      
      <el-main class="main-content">
        <slot />
      </el-main>

      <div class="mobile-nav-wrapper hidden-sm-and-up">
        <MobileNav />
      </div>
    </el-container>
  </el-container>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
import MobileNav from '../components/MobileNav.vue';
import 'element-plus/theme-chalk/display.css'; // Thư viện CSS để ẩn hiện theo thiết bị
</script>

<style scoped>
.layout-container {
  height: 100vh;
  display: flex;
}

/* Sidebar Wrapper: Giữ menu trái cố định */
.sidebar-wrapper {
  height: 100%;
  background-color: #1A365D;
  transition: width 0.3s;
}

/* Xếp Header và Main theo chiều dọc */
.is-vertical {
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Main Content: Phần nội dung thay đổi */
.main-content {
  padding: 0;
  flex: 1;
  background-color: #F8FAFC;
  overflow-y: auto; /* Cho phép cuộn dọc nội dung */
  padding-bottom: 70px; /* Chừa khoảng trống dưới cùng cho Mobile Nav */
}

/* RESPONSIVE: Ẩn hiện Sidebar và MobileNav */
@media (max-width: 768px) {
  .hidden-xs-only { display: none !important; }
}
@media (min-width: 769px) {
  .hidden-sm-and-up { display: none !important; }
}
</style>