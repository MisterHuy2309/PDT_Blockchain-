<template>
  <div class="mobile-nav">
    <router-link to="/" class="nav-item" active-class="active">
      <el-icon><DataLine /></el-icon>
      <span>Home</span>
    </router-link>

    <router-link to="/create" class="nav-item" active-class="active">
      <div class="plus-btn">
        <el-icon><Plus /></el-icon>
      </div>
    </router-link>

    <router-link to="/history" class="nav-item" active-class="active">
      <el-icon><Files /></el-icon>
      <span>Lịch Sử</span>
    </router-link>
    
    <router-link to="/verify" class="nav-item" active-class="active">
      <el-icon><Aim /></el-icon>
      <span>Check</span>
    </router-link>
  </div>
</template>

<style scoped>
.mobile-nav {
  position: fixed; bottom: 0; left: 0; width: 100%;
  height: 65px; background: white; border-top: 1px solid #eee;
  display: flex; justify-content: space-around; align-items: center;
  z-index: 1000; box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}
.nav-item {
  display: flex; flex-direction: column; align-items: center;
  text-decoration: none; color: #94a3b8; font-size: 10px; gap: 4px;
}
.nav-item .el-icon { font-size: 24px; margin-bottom: 2px; }
.nav-item.active { color: #2563EB; font-weight: bold; }

/* Nút cộng ở giữa nổi bật */
.plus-btn {
  background: #2563EB; color: white; width: 45px; height: 45px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.4);
}
.plus-btn .el-icon { font-size: 24px; color: white; margin: 0; }
</style>