<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import type { ShoppingItemInterface } from '@/types/types';

interface Props {
  item: ShoppingItemInterface
  isSelected: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-select-fav-item', itemId: string): void
}>()

function handleClick() {
  emit('on-select-fav-item', props.item.id)
}
</script>

<template>
  <BaseButton class="grow" @click="handleClick" :class="{
    'bg-teal-800': isSelected
  }">{{ item.name }}</BaseButton>
</template>
