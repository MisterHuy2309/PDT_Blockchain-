<template>
  <div class="custom-input-wrapper">
    <label v-if="label" class="input-label">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>

    <el-input
      v-model="modelValue"
      class="styled-input"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event)"
    >
      <template #prefix v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template #suffix v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </template>
    </el-input>
  </div>
</template>

<script setup>
// Định nghĩa các props nhận vào
defineProps({
  label: String,
  modelValue: [String, Number], // Để dùng v-model
  required: Boolean
})

// Định nghĩa sự kiện update để v-model hoạt động
defineEmits(['update:modelValue'])
</script>

<style scoped>
.custom-input-wrapper {
  margin-bottom: 20px; /* Khoảng cách giữa các ô */
  text-align: left;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #334155; /* Màu xám đậm chuyên nghiệp */
}

.required {
  color: #ef4444;
  margin-left: 4px;
}

/* Tùy chỉnh sâu vào class của Element Plus */
:deep(.el-input__wrapper) {
  padding: 8px 15px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px #cbd5e1 inset; /* Viền mỏng */
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px #2563EB inset !important; /* Viền xanh khi bấm vào */
}
</style>