import { defineStore } from 'pinia';
import { ethers } from 'ethers';

export const useWeb3Store = defineStore('web3', {
  state: () => ({
    account: null,
    isConnected: false,
    signer: null,
  }),
  actions: {
    async connectWallet() {
      if (!window.ethereum) {
        alert("Vui lòng cài ví Metamask!");
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        this.account = await signer.getAddress();
        this.signer = signer;
        this.isConnected = true;
      } catch (error) {
        console.error(error);
      }
    }
  }
});