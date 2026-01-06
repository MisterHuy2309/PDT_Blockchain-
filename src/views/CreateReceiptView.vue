<template>
  <div class="create-container">
    <div class="page-header">
      <h2>Chứng Thực Hợp Đồng Mới</h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item>Tạo hồ sơ</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row :gutter="30" class="main-row">
      <el-col :span="10">
        <el-card class="upload-card">
          <div class="upload-area">
            <el-icon class="cloud-icon"><UploadFilled /></el-icon>
            <p>Tải lên bản Scan hợp đồng (PDF)</p>
            <p class="sub-text">Hệ thống sẽ tạo mã Hash (Dấu vân tay số)</p>
          </div>
        </el-card>
      </el-col>

      <el-col :span="14">
        <el-card class="form-card">
          <template #header>
            <div class="card-header">
              <span>Thông Tin Văn Bản</span>
              <el-tag type="info">Draft</el-tag>
            </div>
          </template>

          <el-form label-position="top">
            <el-form-item label="Số Hợp Đồng / Văn Bản">
              <el-input placeholder="VD: HĐ-LD-2026/05" size="large" prefix-icon="Postcard" />
            </el-form-item>

            <el-form-item label="Tên Đối Tác / Bên B">
              <el-input placeholder="VD: Công ty TNHH ABC..." size="large" prefix-icon="User" />
            </el-form-item>

            <el-form-item label="Ngày Ký Kết">
              <el-date-picker type="date" placeholder="Chọn ngày trên hợp đồng" style="width: 100%" size="large" />
            </el-form-item>

            <el-form-item label="Trích yếu nội dung (Ghi chú)">
              <el-input type="textarea" :rows="3" placeholder="VD: Hợp đồng cung cấp thiết bị phần cứng giai đoạn 1..." />
            </el-form-item>

            <div class="action-area">
              <el-button type="primary" size="large" color="#1A365D" class="sign-btn">
                <el-icon style="margin-right: 8px"><Stamp /></el-icon>
                ĐÓNG DẤU BLOCKCHAIN
              </el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { UploadFilled, Postcard, User, Stamp } from '@element-plus/icons-vue';
</script>

<style scoped>
/* Giữ nguyên style cũ */
.create-container { padding: 30px; }
.page-header { margin-bottom: 30px; }
.upload-card { height: 100%; min-height: 450px; display: flex; align-items: center; justify-content: center; text-align: center; border: 2px dashed #dcdfe6; background: #f9fafc; }
.cloud-icon { font-size: 60px; color: #409eff; margin-bottom: 15px; }
.sub-text { color: #909399; font-size: 12px; }
.form-card { border-radius: 12px; }
.card-header { display: flex; justify-content: space-between; align-items: center; font-weight: bold; }
.sign-btn { width: 100%; font-weight: bold; letter-spacing: 1px; margin-top: 10px; height: 50px; }
</style>