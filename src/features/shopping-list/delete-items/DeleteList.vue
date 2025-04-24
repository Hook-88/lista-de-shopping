<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import IconClose from '@/components/icons/IconClose.vue';
import type { ShoppingItemInterface } from '@/types/types';

interface Props {
  items: ShoppingItemInterface[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-remove-from-list', itemId: string): void
}>()

function handleClickClose(itemId: string) {
  emit('on-remove-from-list', itemId)
}

</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id" class="flex items-center justify-between">
      {{ item.name }}
      <IconButton @click="() => handleClickClose(item.id)">
        <IconClose />
      </IconButton>
    </li>
  </ul>
</template>
