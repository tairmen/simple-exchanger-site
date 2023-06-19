<template>
  <div class="w-full h-20">
    <p class="text-black" v-if="label">
      {{ label }}
    </p>

    <div class="w-full flex justify-between items-center border-2 rounded-md border-primary px-5 h-[40px]">
      <input
          class="w-full"
          :value="modelValue"
          :type="type"
          :required="isRequired"
          :placeholder="placeholder"
          @input="onInput"
          @blur="onBlur"
      >
    </div>

    <p
        v-if="errorMessage"
        class="text-red text-[10px]"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'text' },
  icon: { type: String, default: null },
  errorMessage: { type: String, default: null },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  isRequired: { type: Boolean, default: false },
  modelValue: { type: String, default: '' },
});
const emit = defineEmits(['update:modelValue', 'on-input']);
const onBlur = (event) => {
  if (props.type === 'sum') {
    if (event.target.value.includes('.') || event.target.value.includes(',')) {
      const indexOfDot = event.target.value.indexOf('.');
      const indexOfSep = event.target.value.indexOf(',');

      if (indexOfDot > 0) {
        if (event.target.value.length - 1 < indexOfDot + 1) {
          event.target.value += '0'
        }
        if (event.target.value.length - 1 < indexOfDot + 2) {
          event.target.value += '0'
        }
        emit('update:modelValue', event.target.value);
      }

      if (indexOfSep > 0) {
        if (event.target.value.length - 1 > indexOfSep + 1) {
          event.target.value += '0'
        }
        if (event.target.value.length - 1 > indexOfSep + 2) {
          event.target.value += '0'
        }
        emit('update:modelValue', event.target.value);
      }
    }
  }
};

const onInput = (event) => {
  if (props.type === 'sum') {
    const inputLength = event.target.value.length;
    if (event.target.value[inputLength - 1] === '.' || event.target.value[inputLength - 1] === ',') {
      const reg = /[.,]/g;
      const dotArr = [...event.target.value.matchAll(reg)];
      if (dotArr.length > 1) {
        event.target.value = event.target.value.slice(0, inputLength - 1);
      }
    }
    let formattedAmount = event.target.value.replace(/[^0-9.,]/g, '');
    if (event.target.value.includes('.') || event.target.value.includes(',')) {
      const indexOfDot = event.target.value.indexOf('.');
      const indexOfSep = event.target.value.indexOf(',');

      if (indexOfDot > 0) {
        if (event.target.value.length - 1 > indexOfDot + 2) {
          formattedAmount = event.target.value.slice(0, inputLength - 1)
        }
      }

      if (indexOfSep > 0) {
        if (event.target.value.length - 1 > indexOfSep + 2) {
          formattedAmount = event.target.value.slice(0, inputLength - 1)
        }
      }
    }
    event.target.value = formattedAmount;
    emit('update:modelValue', formattedAmount);
    emit('on-input');
  } else {
    emit('update:modelValue', event.target.value);
    emit('on-input');
  }
}
</script>

<style scoped>

</style>
