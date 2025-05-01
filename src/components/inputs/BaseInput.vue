<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  label?: string
  modelValue?: string | number

  value?: string | number
  autofocus?: boolean
  placeholder?: string
  type?: 'text' | 'password' | 'e-mail' | 'number'
}

defineProps<Props>()

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const inputRef = ref<null | HTMLInputElement>(null)

function handleOnInput(event: Event) {
  const target = event.target as HTMLInputElement

  emit('update:modelValue', target.value)
}

function focusInput() {
  inputRef.value?.focus()
}

defineExpose({
  focusInput,
})

</script>

<template>
  <label>{{ label }}:</label>
  <input v-bind="$attrs" @input="handleOnInput" :value="modelValue" ref="inputRef">
</template>
