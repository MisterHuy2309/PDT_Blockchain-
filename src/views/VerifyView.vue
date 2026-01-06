<template>
  <div class="verify-page">
    <div class="verify-card">
      <div class="app-brand">NNC CHECKER APP</div>

      <div v-if="step === 'upload'" class="upload-section">
        <div class="placeholder-box">
          <el-icon class="scan-icon"><Aim /></el-icon>
          <p>Quét hóa đơn để kiểm tra tem chống giả Blockchain</p>
        </div>

        <div class="action-buttons">
          <input 
            type="file" 
            ref="cameraInput" 
            accept="image/*" 
            capture="environment"
            style="display: none" 
            @change="handleFileSelect"
          />
          <input 
            type="file" 
            ref="galleryInput" 
            accept="image/*" 
            style="display: none" 
            @change="handleFileSelect"
          />

          <button class="action-btn camera" @click="$refs.cameraInput.click()">
            <div class="btn-icon"><CameraFilled /></div>
            <span>Mở Camera</span>
          </button>

          <button class="action-btn gallery" @click="$refs.galleryInput.click()">
            <div class="btn-icon"><PictureFilled /></div>
            <span>Tải Ảnh Lên</span>
          </button>
        </div>
      </div>

      <div v-else-if="step === 'scanning'" class="scanning-section">
        <div class="scan-animation">
          <img :src="previewImage" class="preview-img" />
          <div class="scan-line"></div>
        </div>
        <p class="blink-text">Đang truy xuất Blockchain...</p>
      </div>

      <div v-else class="result-section">
        <div v-if="verificationResult.isValid" class="result-box success">
          <div class="shield-icon pulse">
            <el-icon><CircleCheckFilled /></el-icon>
          </div>
          <h2 class="status-text text-green">ĐÃ XÁC THỰC!</h2>
          
          <div class="receipt-info">
            <div class="info-row"><span>Số Hợp Đồng:</span> <b>{{ verificationResult.id }}</b></div>
            <div class="info-row"><span>Ngày ký:</span> <b>{{ verificationResult.date }}</b></div>
            <div class="info-row"><span>Đối tác:</span> <b>{{ verificationResult.partner }}</b></div>
            <div class="divider"></div>
            <div class="blockchain-sign">
              <el-icon><Lock /></el-icon> [Hash khớp: {{ verificationResult.hash }}]
            </div>
          </div>
        </div>

        <div v-else class="result-box error">
          <div class="shield-icon text-red">
            <el-icon><CircleCloseFilled /></el-icon>
          </div>
          <h2 class="status-text text-red">CẢNH BÁO!</h2>
          <p>Tài liệu này không tồn tại hoặc đã bị chỉnh sửa.</p>
        </div>

        <el-button class="back-btn" round @click="resetScan">QUÉT LẠI MÃ KHÁC</el-button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CameraFilled, PictureFilled, Aim, CircleCheckFilled, CircleCloseFilled, Lock } from '@element-plus/icons-vue';

// Các biến trạng thái
const step = ref('upload'); // 'upload' | 'scanning' | 'result'
const previewImage = ref(null);
const cameraInput = ref(null);
const galleryInput = ref(null);
const verificationResult = ref(null);

// Xử lý khi chọn file xong
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 1. Hiện ảnh xem trước
    previewImage.value = URL.createObjectURL(file);
    step.value = 'scanning';

    // 2. Giả lập gọi Blockchain (Mất 2 giây)
    setTimeout(() => {
      mockVerify(file);
    }, 2500);
  }
};

// Hàm giả lập Backend trả về kết quả
const mockVerify = (file) => {
  // Logic giả: Luôn trả về ĐÚNG để demo (Bạn có thể random nếu muốn test lỗi)
  verificationResult.value = {
    isValid: true,
    id: 'HĐ-2026/001',
    date: '05/01/2026',
    partner: 'Công Ty TNHH ABC',
    hash: '0x7b...3a1'
  };
  step.value = 'result';
};

const resetScan = () => {
  step.value = 'upload';
  previewImage.value = null;
  verificationResult.value = null;
};
</script>

<style scoped>
.verify-page {
  background-color: #FCE7F3; /* Màu hồng nhạt */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.verify-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 24px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.app-brand {
  background: #E5E7EB;
  color: #374151;
  font-weight: 800;
  padding: 10px;
  margin: -30px -20px 30px -20px; /* Tràn viền trên */
  border-radius: 24px 24px 0 0;
  letter-spacing: 1px;
}

/* PHẦN UPLOAD */
.placeholder-box {
  background: #F3F4F6;
  border: 2px dashed #D1D5DB;
  border-radius: 16px;
  padding: 40px 20px;
  margin-bottom: 30px;
}
.scan-icon { font-size: 50px; color: #9CA3AF; margin-bottom: 10px; }
.action-buttons { display: flex; gap: 15px; justify-content: center; }
.action-btn {
  border: none;
  border-radius: 16px;
  width: 100px; height: 100px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  font-weight: 600; font-size: 12px;
}
.action-btn:active { transform: scale(0.95); }
.action-btn.camera { background: #DBEAFE; color: #1E40AF; }
.action-btn.gallery { background: #F3F4F6; color: #374151; }
.btn-icon { font-size: 30px; margin-bottom: 8px; }

/* PHẦN SCANNING (Hiệu ứng quét) */
.scan-animation {
  position: relative;
  width: 100%; height: 300px;
  border-radius: 12px; overflow: hidden;
  background: #000;
}
.preview-img { width: 100%; height: 100%; object-fit: contain; opacity: 0.8; }
.scan-line {
  position: absolute; top: 0; left: 0; width: 100%; height: 2px;
  background: #10B981;
  box-shadow: 0 0 10px #10B981;
  animation: scan 2s infinite linear;
}
@keyframes scan {
  0% { top: 0%; }
  100% { top: 100%; }
}
.blink-text { animation: blink 1s infinite; margin-top: 15px; color: #6B7280; font-weight: 600; }
@keyframes blink { 50% { opacity: 0.5; } }

/* PHẦN KẾT QUẢ */
.result-box { background: #F9FAFB; padding: 20px; border-radius: 16px; margin-bottom: 20px; }
.shield-icon { font-size: 80px; margin-bottom: 10px; }
.shield-icon.pulse { animation: pulse 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes pulse { 0% { transform: scale(0); } 100% { transform: scale(1); } }
.text-green { color: #10B981; }
.text-red { color: #EF4444; }
.status-text { margin: 0 0 20px 0; font-weight: 900; letter-spacing: 1px; }
.receipt-info { text-align: left; background: white; padding: 15px; border-radius: 12px; font-size: 14px; border: 1px solid #E5E7EB; }
.info-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
.divider { border-top: 1px dashed #E5E7EB; margin: 10px 0; }
.blockchain-sign { display: flex; align-items: center; gap: 5px; color: #1F2937; font-weight: bold; font-size: 11px; }
.back-btn { width: 100%; font-weight: bold; height: 45px; }
</style>