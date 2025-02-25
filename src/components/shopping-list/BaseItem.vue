<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import type { ShoppingItemInterface } from '@/types/types';
import { computed } from 'vue';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface Props {
  item: ShoppingItemInterface
  isChecked: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-toggle-check', itemId: string): void
}>()

const itemClassName = computed(() => {

  if (props.isChecked) {
    return 'border-ash/20 bg-green-900'
  }

  return 'border-ash/20'
})

function handleClickToggleCheckItem() {
  emit('on-toggle-check', props.item.id)
}

</script>

<template>
  <li class="pl-2 border rounded flex items-center" :class="itemClassName" @click="handleClickToggleCheckItem">
    {{ item.name }}
    <span class="p-2 ml-auto" v-if="isChecked">
      <FontAwesomeIcon :icon="faCheck" />
    </span>
    <button class="p-2 ml-auto" v-else>
      <FontAwesomeIcon :icon="faCircle" />
    </button>
  </li>
</template>
