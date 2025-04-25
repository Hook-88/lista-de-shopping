<script setup lang="ts">
import BaseToolbelt from '../BaseToolbelt.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconMinus from '@/components/icons/IconMinus.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconLink from '@/components/links/IconLink.vue';

interface Props {
  itemId: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-close-edit-tools'): void
  (e: 'on-delete-item', itemId: string): void

}>()

function handleOnClose() {
  emit('on-close-edit-tools')
}

function handleClickDelete() {
  emit('on-delete-item', props.itemId)
}

</script>

<template>
  <BaseToolbelt @on-close="handleOnClose">

    <IconButton>
      <IconMinus />
    </IconButton>

    <IconButton>
      <IconPlus />
    </IconButton>

    <IconLink>
      <IconEdit />
    </IconLink>

    <IconButton @click="handleClickDelete">
      <IconTrash />
    </IconButton>

  </BaseToolbelt>
</template>
