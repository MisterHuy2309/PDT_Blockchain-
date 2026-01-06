<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from './layouts/DefaultLayout.vue';
</script>

<style>
/* Reset CSS toàn cục (Giữ lại ở đây để áp dụng cho cả web) */
body { 
  margin: 0; 
  padding: 0;
  background-color: #F8FAFC; 
  font-family: 'Segoe UI', sans-serif; 
}

/* Tùy chỉnh thanh cuộn (Scrollbar) cho đẹp */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>