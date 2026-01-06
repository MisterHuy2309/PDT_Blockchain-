<template>
  <div class="file-upload-wrapper" :class="{ 'has-file': hasFile }">
    <div v-if="!hasFile" class="upload-placeholder">
      <el-icon class="icon"><UploadFilled /></el-icon>
      <p>Kéo thả hóa đơn vào đây</p>
      <el-button type="primary" plain size="small">Chọn File</el-button>
    </div>
    
    <div v-else class="file-info">
      <el-icon class="file-icon"><Document /></el-icon>
      <div class="details">
        <span class="name">hoadon_mau.png</span>
        <span class="size">2.5 MB</span>
      </div>
      <el-button type="danger" circle size="small" @click="hasFile = false">
        <el-icon><Close /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { UploadFilled, Document, Close } from '@element-plus/icons-vue';

const hasFile = ref(false); // Biến giả lập trạng thái đã có file hay chưa
</script>

<style scoped>
.file-upload-wrapper {
  border: 2px dashed #cbd5e1; border-radius: 12px;
  height: 200px; display: flex; align-items: center; justify-content: center;
  background: #f8fafc; transition: all 0.3s; cursor: pointer;
}
.file-upload-wrapper:hover { border-color: #2563EB; background: #eff6ff; }
.upload-placeholder { text-align: center; color: #64748b; }
.upload-placeholder .icon { font-size: 40px; margin-bottom: 10px; color: #94a3b8; }
.upload-placeholder p { margin: 0 0 10px 0; font-size: 14px; }

/* Khi đã có file */
.file-upload-wrapper.has-file { border-style: solid; border-color: #2563EB; background: #eff6ff; }
.file-info { display: flex; align-items: center; gap: 15px; width: 80%; }
.file-icon { font-size: 30px; color: #2563EB; }
.details { display: flex; flex-direction: column; flex: 1; }
.name { font-weight: bold; color: #334155; font-size: 14px; }
.size { font-size: 12px; color: #94a3b8; }
</style>