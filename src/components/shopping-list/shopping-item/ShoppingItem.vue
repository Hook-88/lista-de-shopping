<script setup lang="ts">
import IconCircle from '@/components/icons/IconCircle.vue';
import { type ShoppingItemInterface } from '@/types/types';
import IconButton from '@/components/buttons/IconButton.vue';
import IconCheck from '@/components/icons/IconCheck.vue';

interface Props {
  item: ShoppingItemInterface
  isChecked: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-toggle-check', itemId: string): void
}>()

function handleClickItem() {
  emit('on-toggle-check', props.item.id)
}

</script>

<template>
  <li class="border border-ivory/20 rounded-sm text-lg pl-2 flex items-center gap-1 justify-between" :class="{
    'bg-green-800': isChecked
  }" @click="handleClickItem">

    {{ item.name }}
    <span class="text-sm mr-auto">
      ({{ item.quantity }} {{ item.unit }})
    </span>

    <span class="px-2 py-1" v-if="isChecked">
      <IconCheck />
    </span>

    <IconButton v-else>
      <IconCircle />
    </IconButton>

  </li>
</template>
