<script setup lang="ts">
import { RouterLink, type RouterLinkProps } from 'vue-router';
import IconAngleRight from '@/components/icons/IconAngleRight.vue';

defineProps<RouterLinkProps>()

</script>

<template>
  <RouterLink :to="to" class="px-2 py-1 ml-auto flex items-center justify-between w-full border-b border-ivory/20">
    <slot></slot>
    <IconAngleRight />
  </RouterLink>
</template>
