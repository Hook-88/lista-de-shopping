<script setup lang="ts">
import BaseModal from '@/components/modal/BaseModal.vue';
import BaseToolbar from '@/components/toolbar/BaseToolbar.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import IconMinus from '@/components/icons/IconMinus.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import { ref, type Ref } from 'vue';
import IconLink from '@/components/links/IconLink.vue';

interface Props {
  itemId: Ref<string | null>
}

const props = defineProps<Props>()

const baseModalRef = ref<InstanceType<typeof BaseModal> | null>(null)

const emit = defineEmits<{
  (e: 'on-close-toolbar'): void
  (e: 'on-delete-item', itemId: string): void
}>()

function handleCloseToolbar() {
  emit('on-close-toolbar')
  closeToolbar()
}

function handleCloseModal() {
  emit('on-close-toolbar')
}

function openToolbar() {
  baseModalRef.value?.openModal()
}

function closeToolbar() {
  baseModalRef.value?.closeModal()
}

function handleClickTrash() {
  emit('on-delete-item', props.itemId.value!)
}

defineExpose({
  openToolbar,
  closeToolbar,
})

</script>

<template>
  <BaseModal variant="transparant" ref="baseModalRef" @close-modal="handleCloseModal">
    <BaseToolbar @on-close-toolbar="handleCloseToolbar">
      <IconButton>
        <IconMinus />
      </IconButton>

      <IconButton>
        <IconPlus />
      </IconButton>

      <IconLink :to="{
        name: 'edit-shopping-item',
        params: {
          itemId: props.itemId.value ? props.itemId.value : '1'
        }
      }">
        <IconEdit />
      </IconLink>

      <IconButton @click="handleClickTrash">
        <IconTrash />
      </IconButton>

    </BaseToolbar>
  </BaseModal>
</template>
