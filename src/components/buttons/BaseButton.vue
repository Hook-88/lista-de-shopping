<script setup lang="ts">
import { computed } from 'vue';


interface Props {
  buttonType?: 'action' | 'danger' | 'transparant'
}

const props = defineProps<Props>()

const buttonClassName = computed(() => {
  if (props.buttonType === 'action') {
    return 'bg-sky-800'
  }

  if (props.buttonType === 'danger') {
    return 'bg-red-900'
  }

  return null
})

</script>

<template>
  <button class="p-2 rounded border border-ash/20" v-bind="$attrs" :class="buttonClassName">
    <slot></slot>
  </button>
</template>
