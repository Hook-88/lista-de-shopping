<script setup lang="ts">
import { useTemplateRef } from 'vue';


const dialogRef = useTemplateRef('dialog-ref')

function openModal() {
  dialogRef.value?.showModal()
}

function closeModal() {
  dialogRef.value?.close()
}

defineExpose({
  openModal,
  closeModal
})


</script>

<template>
  <dialog ref="dialog-ref" @close="closeModal"
    class="open:flex flex-col min-w-screen bg-obsidian text-ash backdrop:backdrop-blur-sm border-b border-ash/20">

    <header class="text-xl p-2 border-b border-ash/20">
      <h1>Delete these items:</h1>
    </header>

    <slot></slot>
  </dialog>
</template>
