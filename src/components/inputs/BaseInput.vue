<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  label: string
  modelValue?: string | number
}

defineProps<Props>()

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function handleOnInput(event: Event) {
  const target = event.target as HTMLInputElement

  emit('update:modelValue', target.value)
}

</script>

<template>
  <label>{{ label }}:</label>
  <input v-bind="$attrs" @input="handleOnInput" :value="modelValue">
</template>
