<script setup lang="ts">
import CategoryButton from './item-category/CategoryButton.vue';
import { computed } from 'vue';

interface Props {
  itemCategories: string[]
  listLength: number
  checkedItemsLength: number
}

const props = defineProps<Props>()

const listProgressText = computed(() => {

  return `(${props.checkedItemsLength}/${props.listLength})`
})

</script>

<template>
  <header>
    <ul class="flex gap-2 mb-2 flex-wrap">
      <li>
        <CategoryButton :is-active="true">
          All
        </CategoryButton>
      </li>
      <li v-for="category in itemCategories" :key="category">
        <CategoryButton>
          {{ category }}
        </CategoryButton>
      </li>
    </ul>

    <div class="text-sm mb-1 flex justify-between">
      <span>{{ listProgressText }}</span>
      <button>
        Hide checked
      </button>
    </div>

  </header>
</template>
