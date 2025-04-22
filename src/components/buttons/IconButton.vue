<script setup lang="ts">
import { type ButtonHTMLAttributes } from 'vue';

defineProps< /* @vue-ignore */ ButtonHTMLAttributes>()

</script>

<template>
  <button class="px-2 py-1">
    <slot></slot>
  </button>
</template>
