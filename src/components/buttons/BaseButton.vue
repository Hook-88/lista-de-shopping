<script setup lang="ts">
import { type ButtonHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: 'action' | 'danger'
}

defineProps<Props>()


</script>

<template>
  <button class="px-2 py-1 rounded-sm border border-ivory/20" :class="{
    'bg-red-900': variant === 'danger',
    'bg-sky-700': variant === 'action'
  }">
    <slot></slot>
  </button>
</template>
