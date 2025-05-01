<script setup lang="ts">
import BaseInput from '@/components/inputs/BaseInput.vue';
import { ref } from 'vue';

interface Props {
  label?: string
  modelValue?: string | number

  value?: string | number
  autofocus?: boolean
  placeholder?: string
}

const props = defineProps<Props>()

const textInputRef = ref<InstanceType<typeof BaseInput> | null>(null)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function focusInput() {
  textInputRef.value?.focusInput()
}

defineExpose({
  focusInput
})

</script>

<template>
  <BaseInput v-bind="props" type="text" :value="modelValue" @input="handleInput" class="px-2 py-1 rounded bg-ivory/10"
    ref="textInputRef" />
</template>
