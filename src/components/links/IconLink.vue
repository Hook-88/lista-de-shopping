<script setup lang="ts">
import { RouterLink, type RouterLinkProps } from 'vue-router';

defineProps<RouterLinkProps>()


</script>

<template>
  <RouterLink :to="to" class="px-2 py-1">
    <slot></slot>
  </RouterLink>
</template>
