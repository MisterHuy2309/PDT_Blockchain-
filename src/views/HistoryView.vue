<template>
  <div class="history-container">
    <div class="header-actions">
      <h2>Kho Lưu Trữ Hợp Đồng</h2>
      <el-button type="default" plain>Xuất Báo Cáo</el-button>
    </div>

    <el-card class="table-card">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="Số HĐ" width="150" font-weight="bold" />
        <el-table-column prop="date" label="Ngày Ký" width="120" />
        <el-table-column prop="partner" label="Đối Tác (Bên B)" />
        <el-table-column prop="summary" label="Nội dung" show-overflow-tooltip />
        
        <el-table-column prop="status" label="Trạng Thái">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'Đã Lưu' ? 'success' : 'info'" effect="light">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="Thao Tác" width="150">
          <template #default>
            <el-button size="small" type="primary" link>Xem Hash</el-button>
            <el-button size="small" type="primary" link>Lấy QR</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
// Dữ liệu mẫu phù hợp với hợp đồng
const tableData = [
  { id: 'HĐ-001/2026', date: '2026-01-05', partner: 'Công ty ABC', summary: 'Thuê văn phòng trọn gói', status: 'Đã Lưu' },
  { id: 'HĐ-002/2026', date: '2026-01-04', partner: 'Nguyễn Văn X', summary: 'Hợp đồng lao động chính thức', status: 'Đã Lưu' },
];
</script>

<style scoped>
.history-container { padding: 30px; }
.header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.table-card { border-radius: 12px; }
</style>