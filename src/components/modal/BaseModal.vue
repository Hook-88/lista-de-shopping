<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  variant: 'blur' | 'transparant'
}

const dialogRef = ref<HTMLDialogElement | null>(null)

defineProps<Props>()

function openModal() {
  dialogRef.value?.showModal()
}

function closeModal() {
  dialogRef.value?.close()
  emit('close')
}

const emit = defineEmits<{
  (e: 'close'): void
}>()

function handleClose() {
  closeModal()
}

defineExpose({
  openModal,
  closeModal
})

</script>

<template>
  <dialog @close="handleClose" class="open:flex flex-col min-w-screen min-h-screen text-ivory" :class="{
    'bg-obsidian/50 backdrop-blur-xs': variant === 'blur',
    'bg-obsidian/20': variant === 'transparant'
  }" ref="dialogRef">
    <div class="bg-obsidian">
      <slot></slot>
    </div>
  </dialog>
</template>
