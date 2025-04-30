<script setup lang="ts">
import IconButton from '../buttons/IconButton.vue';
import IconClose from '../icons/IconClose.vue';

const emit = defineEmits<{
  (e: 'on-close-toolbar'): void
}>()

function handleClickClose() {
  emit('on-close-toolbar')
}

</script>

<template>
  <div class="bg-sky-800 mt-auto mb-7 mx-2 rounded-sm border border-ivory/30 text-2xl">
    <slot></slot>
    <IconButton @click="handleClickClose">
      <IconClose />
    </IconButton>
  </div>
</template>
