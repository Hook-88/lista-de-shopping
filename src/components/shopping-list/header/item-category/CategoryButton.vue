<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  isActive?: boolean
}

const props = defineProps<Props>()

const categoryButtonClassName = computed(() => {

  if (props.isActive) {
    return 'bg-emerald-800'
  }

  return null
})

</script>

<template>
  <button class="px-2 py-1 border border-ash/20 rounded-xl" :class="categoryButtonClassName">
    <slot></slot>
  </button>
</template>
