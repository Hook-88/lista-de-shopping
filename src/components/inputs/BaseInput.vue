<script setup lang="ts">

interface Props {
  label?: string
  modelValue?: string | number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function handleOnInput(event: Event) {
  const target = event.target as HTMLInputElement

  emit('update:modelValue', target.value)
}

</script>

<template>
  <div>
    <label v-if="label">{{ label }}:</label>
    <br>
    <input class="w-full px-2 py-1 bg-ash/10 rounded" v-bind="$attrs" @input="handleOnInput" :value="modelValue">
  </div>
</template>
