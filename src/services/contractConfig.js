// src/services/contractConfig.js

// 🔴 BẮT BUỘC: Thay dòng dưới bằng địa chỉ Contract của bạn (Copy từ Remix)
export const CONTRACT_ADDRESS = "0x04677dbf219959e7817b2097e081950ba5472077";

// Đây là ABI bạn vừa gửi (Giữ nguyên không cần sửa)
export const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "docHash",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "DocumentAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_docHash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_fileName",
                "type": "string"
            }
        ],
        "name": "addDocument",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_docHash",
                "type": "string"
            }
        ],
        "name": "verifyDocument",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];