<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';

interface Props {
  itemsToDelete: string[]
}

const emit = defineEmits<{
  (e: 'on-confirm-delete'): void
  (e: 'on-cancel-delete'): void
}>()

defineProps<Props>()

function handleClickConfirmDelete() {
  emit('on-confirm-delete')
}

function handleClickCancelDelete() {
  emit('on-cancel-delete')
}

</script>

<template>
  <main class="p-2 border-b border-ash/20">
    <ul>
      <li v-for="item in itemsToDelete" :key="item">
        {{ item }}
      </li>
    </ul>
  </main>

  <footer class="flex gap-2 p-2">
    <BaseButton button-type="action" class="grow" @click="handleClickConfirmDelete">
      Confirm
    </BaseButton>

    <BaseButton button-type="danger" @click="handleClickCancelDelete">
      Cancel
    </BaseButton>

  </footer>
</template>
