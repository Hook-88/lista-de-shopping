<script setup lang="ts">
import BaseInput from '@/components/inputs/BaseInput.vue';
import type { InputHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  label: string
  modelValue?: string | number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

</script>

<template>
  <BaseInput v-bind="props" v-on="emit" class="px-2 py-1 rounded bg-ivory/10" />
</template>
