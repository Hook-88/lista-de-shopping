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
  isSingleItem: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-close-edit-tools'): void
  (e: 'on-delete-item', itemId: string): void
  (e: 'on-increment-quantity', itemId: string): void
  (e: 'on-decrement-quantity', itemId: string): void
}>()

function handleOnClose() {
  emit('on-close-edit-tools')
}

function handleClickDelete() {
  emit('on-delete-item', props.itemId)
}

function handleClickIncrement() {
  emit('on-increment-quantity', props.itemId)
}

function handleClickDecrement() {
  emit('on-decrement-quantity', props.itemId)
}

</script>

<template>
  <BaseToolbelt @on-close="handleOnClose">

    <IconButton @click="handleClickDecrement" :disabled="isSingleItem" class="disabled:text-ivory/40">
      <IconMinus />
    </IconButton>

    <IconButton @click="handleClickIncrement">
      <IconPlus />
    </IconButton>

    <IconLink :to="{
      name: 'edit-shopping-item',
      params: {
        itemId: props.itemId
      }
    }">
      <IconEdit />
    </IconLink>

    <IconButton @click="handleClickDelete">
      <IconTrash />
    </IconButton>

  </BaseToolbelt>
</template>
