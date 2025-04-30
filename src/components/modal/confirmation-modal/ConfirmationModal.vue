<script setup lang="ts">
import PageHeader from '@/components/page-header/PageHeader.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import IconClose from '@/components/icons/IconClose.vue';
import BaseButton from '@/components/buttons/BaseButton.vue'
import { ref } from 'vue';
import BaseModal from '../BaseModal.vue';

interface Props {
  title: string
}

const BaseModalRef = ref<InstanceType<typeof BaseModal> | null>(null)

defineProps<Props>()

function openModal() {
  BaseModalRef.value?.openModal()
}

function closeModal() {
  BaseModalRef.value?.closeModal()
}

function handleClickConfirm() {
  emit('on-confirm')
}

function handleClose() {
  emit('on-close')
}

const emit = defineEmits<{
  (e: 'on-confirm'): void
  (e: 'on-close'): void
}>()

defineExpose({
  openModal,
  closeModal
})

</script>

<template>
  <BaseModal variant="blur" ref="BaseModalRef" @close="handleClose">
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
  </BaseModal>
</template>
