<script setup lang="ts">
import BaseToolbelt from '../BaseToolbelt.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconMinus from '@/components/icons/IconMinus.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconTrash from '@/components/icons/IconTrash.vue';

const emit = defineEmits<{
  (e: 'on-close-edit-tools'): void
}>()

function handleOnClose() {
  emit('on-close-edit-tools')
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

    <IconButton>
      <IconEdit />
    </IconButton>

    <IconButton>
      <IconTrash />
    </IconButton>

  </BaseToolbelt>
</template>
