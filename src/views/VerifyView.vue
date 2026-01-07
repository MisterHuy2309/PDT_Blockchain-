<template>
  <div class="verify-page">
    <div class="verify-card">
      <div class="app-brand">NNC CHECKER APP</div>

      <div v-if="step === 'upload'" class="upload-section">
        <div class="placeholder-box">
          <el-icon class="scan-icon"><Aim /></el-icon>
          <p>Tải file để kiểm tra tính xác thực Blockchain</p>
        </div>

        <div class="action-buttons">
          <input 
            type="file" 
            ref="fileInput" 
            accept=".pdf,.jpg,.png,.jpeg"
            style="display: none" 
            @change="handleFileSelect"
          />

          <button class="action-btn gallery" @click="$refs.fileInput.click()">
            <div class="btn-icon"><DocumentChecked /></div>
            <span>Chọn File / Ảnh</span>
          </button>
        </div>
      </div>

      <div v-else-if="step === 'scanning'" class="scanning-section">
        <div class="scan-animation">
           <el-icon class="is-loading" size="50" color="#10B981"><Loading /></el-icon>
        </div>
        <p class="blink-text">Đang tính Hash & Truy xuất Blockchain...</p>
      </div>

      <div v-else class="result-section">
        
        <div v-if="verificationResult && verificationResult.isValid" class="result-box success">
          <div class="shield-icon pulse">
            <el-icon><CircleCheckFilled /></el-icon>
          </div>
          <h2 class="status-text text-green">XÁC THỰC THÀNH CÔNG!</h2>
          
          <div class="receipt-info">
            <div class="info-row">
              <span>Tên File gốc:</span> 
              <b>{{ verificationResult.fileName }}</b>
            </div>
            <div class="info-row">
              <span>Thời gian ký:</span> 
              <b>{{ verificationResult.timestamp }}</b>
            </div>
            <div class="info-row">
              <span>Người ký (Ví):</span> 
              <b style="font-size: 10px">{{ verificationResult.owner }}</b>
            </div>
            
            <div class="divider"></div>
            
            <div class="blockchain-sign">
              <el-icon><Lock /></el-icon> 
              <span>Mã Hash khớp 100%</span>
            </div>
            <code class="hash-debug">{{ currentHash }}</code>
          </div>
        </div>

        <div v-else class="result-box error">
          <div class="shield-icon text-red">
            <el-icon><CircleCloseFilled /></el-icon>
          </div>
          <h2 class="status-text text-red">CẢNH BÁO GIẢ MẠO!</h2>
          <p>Tài liệu này KHÔNG tồn tại trên hệ thống Blockchain.</p>
          <div class="receipt-info error-info">
             <p>Hash của file này:</p>
             <code class="hash-debug">{{ currentHash }}</code>
          </div>
        </div>

        <el-button class="back-btn" round @click="resetScan">KIỂM TRA TÀI LIỆU KHÁC</el-button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Aim, DocumentChecked, CircleCheckFilled, CircleCloseFilled, Lock, Loading } from '@element-plus/icons-vue';
import { useWeb3Store } from '../stores/web3';
import SHA256 from 'crypto-js/sha256';
import lib from 'crypto-js/lib-typedarrays';
import { ElMessage } from 'element-plus';

const web3Store = useWeb3Store();
const step = ref('upload'); // 'upload' | 'scanning' | 'result'
const fileInput = ref(null);
const verificationResult = ref(null);
const currentHash = ref('');

// Xử lý khi chọn file
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  step.value = 'scanning';
  
  // 1. Tính Hash của file vừa chọn
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const fileContent = e.target.result;
      const wordArray = lib.create(fileContent);
      const hash = SHA256(wordArray).toString();
      currentHash.value = "0x" + hash; // Hash thật của file này
      
      console.log("Đang kiểm tra Hash:", currentHash.value);

      // 2. Gọi Smart Contract để kiểm tra
      const result = await web3Store.verifyDocumentOnBlockchain(currentHash.value);
      
      // 3. Hiển thị kết quả
      if (result && result.isValid) {
        verificationResult.value = result;
      } else {
        verificationResult.value = null; // Không tìm thấy
      }
      
      step.value = 'result';
      
    } catch (error) {
      console.error(error);
      ElMessage.error("Lỗi khi xử lý file!");
      step.value = 'upload';
    }
  };
  reader.readAsArrayBuffer(file);
};

const resetScan = () => {
  step.value = 'upload';
  verificationResult.value = null;
  currentHash.value = '';
  if (fileInput.value) fileInput.value.value = '';
};
</script>

<style scoped>
/* Style giữ nguyên như cũ, chỉ chỉnh lại chút cho đẹp */
.verify-page { background-color: #F1F5F9; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px; }
.verify-card { width: 100%; max-width: 400px; background: white; border-radius: 20px; padding: 30px 20px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
.app-brand { font-weight: 800; color: #1E293B; margin-bottom: 30px; letter-spacing: 1px; }

/* Upload */
.placeholder-box { background: #F8FAFC; border: 2px dashed #CBD5E1; border-radius: 16px; padding: 40px 20px; margin-bottom: 30px; }
.scan-icon { font-size: 50px; color: #94A3B8; margin-bottom: 10px; }
.action-btn { background: #1A365D; color: white; border: none; border-radius: 12px; width: 100%; height: 60px; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: bold; cursor: pointer; }
.action-btn:active { transform: scale(0.98); }

/* Result */
.result-box { background: #F8FAFC; padding: 20px; border-radius: 16px; margin-bottom: 20px; }
.result-box.success { border: 2px solid #10B981; background: #ECFDF5; }
.result-box.error { border: 2px solid #EF4444; background: #FEF2F2; }

.shield-icon { font-size: 60px; margin-bottom: 10px; }
.text-green { color: #059669; }
.text-red { color: #DC2626; }
.status-text { margin: 0 0 15px 0; font-weight: 900; }

.receipt-info { text-align: left; background: white; padding: 15px; border-radius: 8px; font-size: 13px; border: 1px solid #E2E8F0; }
.info-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
.divider { border-top: 1px dashed #CBD5E1; margin: 10px 0; }
.blockchain-sign { display: flex; align-items: center; gap: 5px; color: #1E293B; font-weight: bold; }
.hash-debug { display: block; font-family: monospace; font-size: 10px; color: #aaa; margin-top: 5px; word-break: break-all; }
.back-btn { width: 100%; font-weight: bold; height: 45px; }

/* Animation */
.pulse { animation: pulse 0.5s; }
@keyframes pulse { 0% { transform: scale(0); } 80% { transform: scale(1.1); } 100% { transform: scale(1); } }
</style>