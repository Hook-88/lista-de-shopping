<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router';
import IconLink from './IconLink.vue';

interface Props extends /* ignore */ RouterLinkProps {
  variant: 'action' | 'danger'
}

defineProps<Props>()

</script>

<template>
  <IconLink :to="to" class="border border-ivory/20 rounded-sm" :class="{
    'bg-red-900': variant === 'danger'
  }">
    <slot></slot>
  </IconLink>
</template>
