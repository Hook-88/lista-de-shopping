<script setup lang="ts">
import IconButton from '../buttons/IconButton.vue';
import IconClose from '../icons/IconClose.vue';

const emit = defineEmits<{
  (e: 'on-close'): void
}>()

function handleClickCloseToolbar() {
  emit('on-close')
}

</script>

<template>
  <div class="bg-ocean border border-ivory/30 rounded-sm text-xl flex justify-around fixed inset-x-0 mx-2 bottom-8">
    <slot></slot>
    <IconButton @click="handleClickCloseToolbar">
      <IconClose />
    </IconButton>
  </div>
</template>
