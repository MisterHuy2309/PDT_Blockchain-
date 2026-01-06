<template>
  <div class="header-container">
    <div class="left-section">
      <h3>Hệ Thống Xác Thực Blockchain</h3>
    </div>

    <div class="right-section">
      <el-button 
        v-if="!web3Store.isConnected" 
        type="primary" 
        color="#F59E0B" 
        @click="connectWallet"
      >
        Kết nối ví Metamask
      </el-button>

      <div v-else class="wallet-info">
        <span class="status-dot"></span>
        <span class="address">{{ shortAddress }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useWeb3Store } from '../stores/web3'; // Gọi cái kho chứa Web3 ra

const web3Store = useWeb3Store();

// Hàm gọi ví Metamask mở lên
const connectWallet = async () => {
  await web3Store.connectWallet();
};

// Hàm cắt ngắn địa chỉ ví cho đẹp (VD: 0x123...456)
const shortAddress = computed(() => {
  if (!web3Store.account) return '';
  return web3Store.account.substring(0, 6) + '...' + web3Store.account.substring(38);
});
</script>

<style scoped>
.header-container {
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.left-section h3 { margin: 0; color: #1A365D; font-size: 16px; }
.wallet-info {
  background: #EFF6FF;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #BFDBFE;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1E40AF;
  font-weight: bold;
}
.status-dot {
  width: 8px; height: 8px;
  background-color: #10B981; /* Màu xanh lá */
  border-radius: 50%;
}
</style>