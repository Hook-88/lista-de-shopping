<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue';
import type { HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ HTMLAttributes {
  title: string
}

defineProps<Props>()
</script>

<template>
  <nav popover id="main-nav" class="open:flex flex-col min-w-screen bg-[#242424] text-ivory">

    <button class="px-2 py-1 text-left flex items-center justify-between border-b border-ivory/20"
      popovertarget="main-nav">
      {{ title }}
      <IconClose />
    </button>

    <slot></slot>

  </nav>
</template>
