<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  isSelected: boolean
}

defineProps<Props>()

</script>

<template>
  <button class="border border-ivory/20 px-2 py-1 rounded-xl" :class="{
    'bg-emerald-800': isSelected
  }">
    <slot></slot>
  </button>
</template>
