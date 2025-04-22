<script setup lang="ts">
import IconCircle from '@/components/icons/IconCircle.vue';
import { type ShoppingItemInterface } from '@/types/types';
import IconButton from '@/components/buttons/IconButton.vue';

interface Props {
  item: ShoppingItemInterface
  isChecked: boolean
}

defineProps<Props>()

</script>

<template>
  <li class="border border-ivory/20 rounded-sm text-lg pl-2 flex items-center gap-1">

    {{ item.name }}
    <span class="text-sm">
      ({{ item.quantity }} {{ item.unit }})
    </span>

    <IconButton class="ml-auto">
      <IconCircle />
    </IconButton>

  </li>
</template>
