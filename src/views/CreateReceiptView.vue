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
          <input 
            type="file" 
            ref="fileInput" 
            style="display: none" 
            accept=".pdf,.jpg,.png,.jpeg"
            @change="handleFileChange"
          />

          <div v-if="!fileSelected" class="upload-area" @click="triggerUpload">
            <el-icon class="cloud-icon"><UploadFilled /></el-icon>
            <p>Nhấn để tải lên bản Scan (PDF/Ảnh)</p>
            <p class="sub-text">Hệ thống sẽ tạo mã Hash (SHA-256) ngay lập tức</p>
          </div>

          <div v-else class="file-preview">
            <el-icon class="file-icon"><Document /></el-icon>
            <div class="file-info">
              <p class="file-name">{{ fileSelected.name }}</p>
              <p class="file-size">{{ (fileSelected.size / 1024 / 1024).toFixed(2) }} MB</p>
            </div>
            
            <div class="hash-box">
              <span class="hash-label">Mã Băm (Digital Fingerprint):</span>
              <code class="hash-value">{{ docHash || 'Đang tính toán...' }}</code>
            </div>

            <el-button type="danger" link @click="removeFile">Xóa file</el-button>
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
              <el-input 
                v-model="formData.id" 
                placeholder="VD: HĐ-LD-2026/05" 
                size="large" 
                prefix-icon="Postcard" 
              />
            </el-form-item>

            <el-form-item label="Tên Đối Tác / Bên B">
              <el-input 
                v-model="formData.partner" 
                placeholder="VD: Công ty TNHH ABC..." 
                size="large" 
                prefix-icon="User" 
              />
            </el-form-item>

            <el-form-item label="Ngày Ký Kết">
              <el-date-picker 
                v-model="formData.date"
                type="date" 
                placeholder="Chọn ngày trên hợp đồng" 
                style="width: 100%" 
                size="large"
                format="DD/MM/YYYY"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>

            <el-form-item label="Trích yếu nội dung (Ghi chú)">
              <el-input 
                v-model="formData.summary" 
                type="textarea" 
                :rows="3" 
                placeholder="VD: Hợp đồng cung cấp thiết bị phần cứng giai đoạn 1..." 
              />
            </el-form-item>

            <div class="action-area">
              <el-button 
                type="primary" 
                size="large" 
                color="#1A365D" 
                class="sign-btn"
                :loading="web3Store.isLoading"
                @click="handleSign"
              >
                <el-icon style="margin-right: 8px"><Stamp /></el-icon>
                {{ web3Store.isLoading ? 'ĐANG GỬI LÊN BLOCKCHAIN...' : 'ĐÓNG DẤU BLOCKCHAIN' }}
              </el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UploadFilled, Postcard, User, Stamp, Document } from '@element-plus/icons-vue';
import { useWeb3Store } from '../stores/web3';
import { ElMessage } from 'element-plus';
import SHA256 from 'crypto-js/sha256';
import lib from 'crypto-js/lib-typedarrays';

// Khởi tạo Store
const web3Store = useWeb3Store();

// Biến quản lý File & Hash
const fileInput = ref(null);
const fileSelected = ref(null);
const docHash = ref('');

// Biến quản lý Form nhập liệu
const formData = reactive({
  id: '',
  partner: '',
  date: '',
  summary: ''
});

// 1. Kích hoạt input file ẩn khi bấm vào vùng upload
const triggerUpload = () => {
  fileInput.value.click();
};

// 2. Xử lý khi chọn file (Tính Hash thật)
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  fileSelected.value = file;
  docHash.value = ''; // Reset hash cũ

  // Đọc file dạng ArrayBuffer để tính Hash chính xác
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const fileContent = e.target.result;
      const wordArray = lib.create(fileContent); // Chuyển sang định dạng crypto-js hiểu
      const hash = SHA256(wordArray).toString();
      
      docHash.value = "0x" + hash; // Thêm tiền tố 0x cho đúng chuẩn Hex
      ElMessage.success("Đã tính mã Hash thành công!");
    } catch (error) {
      console.error(error);
      ElMessage.error("Lỗi khi đọc file!");
    }
  };
  reader.readAsArrayBuffer(file);
};

// 3. Xóa file chọn lại
const removeFile = () => {
  fileSelected.value = null;
  docHash.value = '';
  if (fileInput.value) fileInput.value.value = ''; // Reset input
};

// 4. Xử lý Ký & Gửi Blockchain
const handleSign = async () => {
  // Validate cơ bản
  if (!fileSelected.value) {
    ElMessage.warning("Vui lòng tải lên file hợp đồng!");
    return;
  }
  if (!docHash.value) {
    ElMessage.warning("Đang tính toán mã Hash, vui lòng chờ...");
    return;
  }
  if (!formData.id || !formData.partner) {
    ElMessage.warning("Vui lòng nhập Số hợp đồng và Tên đối tác!");
    return;
  }

  // Kết nối ví nếu chưa
  if (!web3Store.isConnected) {
    await web3Store.connectWallet();
  }

  // Gửi lên Blockchain (Gọi hàm trong Store)
  // Lưu ý: Smart Contract hiện tại chỉ lưu Hash và Tên file. 
  // Nếu muốn lưu thêm metadata (Số HĐ, Đối tác...), bạn cần sửa Smart Contract hoặc lưu Off-chain (Database).
  // Ở đây ta gửi: Hash + "Số HĐ - Tên File" để dễ nhận diện trên Chain.
  const fileNameOnChain = `${formData.id} | ${fileSelected.value.name}`;
  
  const result = await web3Store.addDocumentToBlockchain(docHash.value, fileNameOnChain);

  if (result.success) {
    ElMessage.success(`Thành công! Hash giao dịch: ${result.hash.substring(0, 10)}...`);
    // Reset form sau khi thành công
    removeFile();
    formData.id = '';
    formData.partner = '';
    formData.summary = '';
  }
};
</script>

<style scoped>
.create-container { padding: 30px; }
.page-header { margin-bottom: 30px; }

/* Upload Card Styles */
.upload-card { 
  height: 100%; min-height: 450px; 
  border: 2px dashed #dcdfe6; background: #f9fafc; 
  display: flex; flex-direction: column; justify-content: center;
}
.upload-area { 
  cursor: pointer; padding: 40px; text-align: center; height: 100%;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.upload-area:hover { background-color: #ecf5ff; }
.cloud-icon { font-size: 60px; color: #409eff; margin-bottom: 15px; }
.sub-text { color: #909399; font-size: 12px; margin-top: 5px; }

/* File Preview Styles */
.file-preview { 
  text-align: center; padding: 20px; 
}
.file-icon { font-size: 50px; color: #1A365D; margin-bottom: 10px; }
.file-name { font-weight: bold; color: #333; margin: 5px 0; word-break: break-all; }
.file-size { color: #999; font-size: 12px; margin-bottom: 20px; }

.hash-box {
  background: #fff; border: 1px solid #e4e7ed; padding: 15px;
  border-radius: 8px; margin-bottom: 20px; text-align: left;
}
.hash-label { display: block; font-size: 11px; color: #909399; margin-bottom: 5px; font-weight: bold; text-transform: uppercase; }
.hash-value { 
  display: block; font-family: monospace; color: #e6a23c; 
  word-break: break-all; font-size: 12px; background: #fdf6ec; padding: 5px; border-radius: 4px;
}

/* Form Styles */
.form-card { border-radius: 12px; }
.card-header { display: flex; justify-content: space-between; align-items: center; font-weight: bold; }
.sign-btn { width: 100%; font-weight: bold; letter-spacing: 1px; margin-top: 10px; height: 50px; }
</style>