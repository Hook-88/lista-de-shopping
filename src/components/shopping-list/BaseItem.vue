<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import type { ShoppingItemInterface } from '@/types/types';
import { computed } from 'vue';

interface Props {
  item: ShoppingItemInterface
  isChecked: boolean
}

const props = defineProps<Props>()

const itemClassName = computed(() => {

  if (props.isChecked) {
    return 'border-ash/20 bg-green-900'
  }

  return 'border-ash/20'
})

</script>

<template>
  <li class="pl-2 border rounded flex items-center" :class="itemClassName">
    {{ item.name }}
    <button class="p-2 ml-auto">
      <FontAwesomeIcon :icon="faCircle" />
    </button>
  </li>
</template>
