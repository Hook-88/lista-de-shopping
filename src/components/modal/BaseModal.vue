<script setup lang="ts">
import PageHeader from '@/components/page-header/PageHeader.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import IconClose from '@/components/icons/IconClose.vue';
import BaseButton from '../buttons/BaseButton.vue';
import { ref } from 'vue';

interface Props {
  title: string
}

const dialogRef = ref<HTMLDialogElement | null>(null)

defineProps<Props>()

function openModal() {
  dialogRef.value?.showModal()
}

function closeModal() {
  dialogRef.value?.close()
}

function handleClickConfirm() {
  emit('on-confirm')
}

const emit = defineEmits<{
  (e: 'on-confirm'): void
}>()

defineExpose({
  openModal,
  closeModal
})

</script>

<template>
  <dialog class="open:flex flex-col min-w-screen min-h-screen bg-obsidian/50 backdrop-blur-xs text-ivory"
    ref="dialogRef">
    <div class="bg-obsidian">
      <PageHeader class="items-center justify-between">
        <h1 class="ml-2">
          {{ title }}
        </h1>
        <IconButton @click="closeModal">
          <IconClose />
        </IconButton>
      </PageHeader>

      <main class="p-2">
        <slot></slot>
      </main>

      <footer class="p-2 border-y border-ivory/20 flex gap-2">
        <BaseButton variant="action" class="grow" @click="handleClickConfirm">Confirm</BaseButton>
        <BaseButton variant="danger" @click="closeModal">Cancel</BaseButton>
      </footer>
    </div>
  </dialog>
</template>
