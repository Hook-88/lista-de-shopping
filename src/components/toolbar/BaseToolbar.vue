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
  <div class="bg-sky-900 mt-auto mb-14 mx-2 rounded-sm border border-ivory/20 text-2xl flex justify-around">
    <slot></slot>
    <IconButton @click="handleClickClose">
      <IconClose />
    </IconButton>
  </div>
</template>
