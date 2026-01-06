<template>
  <el-button
    class="app-btn"
    :class="variant"
    v-bind="$attrs"
  >
    <slot />
  </el-button>
</template>

<script setup>
// Props:
// - variant: 'primary' (màu chính), 'success' (màu xanh lá), 'danger' (màu đỏ)
defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>

<style scoped>
.app-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  border: none;
  transition: all 0.3s ease;
  height: 40px; /* Chiều cao chuẩn */
  padding: 0 25px;
  border-radius: 8px;
}

/* 1. Primary: Gradient Xanh Dương -> Tím (Style chủ đạo) */
.app-btn.primary {
  background: linear-gradient(135deg, #2563EB 0%, #1A365D 100%);
  color: white;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
}
.app-btn.primary:hover {
  background: linear-gradient(135deg, #3B82F6 0%, #1e40af 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(37, 99, 235, 0.4);
}

/* 2. Success: Gradient Xanh Lá (Cho nút Verify) */
.app-btn.success {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
}

/* 3. Danger: Gradient Đỏ (Cho nút Hủy/Xóa) */
.app-btn.danger {
  background: linear-gradient(135deg, #EF4444 0%, #B91C1C 100%);
  color: white;
}
</style>