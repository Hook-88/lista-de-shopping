<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ HTMLAttributes {
  title?: string
}

const props = defineProps<Props>()

</script>

<template>
  <header class="text-2xl border-b border-ivory/20 flex px-1" v-bind="props">
    <slot></slot>
  </header>
</template>
