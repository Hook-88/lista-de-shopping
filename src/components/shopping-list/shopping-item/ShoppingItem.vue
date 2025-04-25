<script setup lang="ts">
import IconCircle from '@/components/icons/IconCircle.vue';
import { type ShoppingItemInterface } from '@/types/types';
import IconButton from '@/components/buttons/IconButton.vue';
import IconCheck from '@/components/icons/IconCheck.vue';

interface Props {
  item: ShoppingItemInterface
  isChecked: boolean
  isSelected: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-toggle-check', itemId: string): void
  (e: 'on-edit-item', itemId: string): void
}>()

function handleClickItem() {
  emit('on-toggle-check', props.item.id)
}

function handleClickEditItem() {
  emit('on-edit-item', props.item.id)
}

</script>

<template>
  <li class="border rounded-sm text-lg pl-2 flex items-center gap-1 justify-between" :class="{
    'bg-green-800': isChecked,
    'border-ivory': isSelected,
    'border-ivory/20': !isSelected
  }" @click="handleClickItem">

    {{ item.name }}
    <span class="text-sm mr-auto">
      ({{ item.quantity }} {{ item.unit }})
    </span>

    <span class="px-2 py-1" v-if="isChecked">
      <IconCheck />
    </span>

    <IconButton v-else @click.stop="handleClickEditItem">
      <IconCircle :is-solid="isSelected" />
    </IconButton>

  </li>
</template>
