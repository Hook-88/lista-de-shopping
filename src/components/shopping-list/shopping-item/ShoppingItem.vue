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
<<<<<<< HEAD
  (e: 'on-edit-item', itemId: string): void
=======
  (e: 'on-select-item', itemId: string): void
>>>>>>> edit-item
}>()

function handleClickItem() {
  emit('on-toggle-check', props.item.id)
}

<<<<<<< HEAD
function handleClickEditItem() {
  emit('on-edit-item', props.item.id)
=======
function handleClickSelectItem() {
  emit('on-select-item', props.item.id)
>>>>>>> edit-item
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

<<<<<<< HEAD
    <IconButton v-else @click.stop="handleClickEditItem">
=======
    <IconButton v-else @click.stop="handleClickSelectItem">
>>>>>>> edit-item
      <IconCircle :is-solid="isSelected" />
    </IconButton>

  </li>
</template>
