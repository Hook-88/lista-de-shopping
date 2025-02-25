<script setup lang="ts">
import { useSelectSingleId } from '@/features/select-single-id/selectSingleId';
import CategoryButton from './item-category/CategoryButton.vue';
import { computed } from 'vue';

interface Props {
  itemCategories: string[]
  listLength: number
  checkedItemsLength: number
}

const props = defineProps<Props>()

const listProgressText = computed(() => {

  if (props.checkedItemsLength === props.listLength) {
    return `(${props.checkedItemsLength}/${props.listLength}) - Completed`
  }

  return `(${props.checkedItemsLength}/${props.listLength})`
})

const selectSingleId = useSelectSingleId()

function handleClickCategory(category: string) {
  selectSingleId.selectId(category)
}

function categoryIsSelected(category: string) {
  return selectSingleId.selectedId.value === category
}

function handleClickCategoryAll() {
  selectSingleId.clearSelection()
}

</script>

<template>
  <header>
    <ul class="flex gap-2 mb-2 flex-wrap">
      <li>
        <CategoryButton :is-active="!selectSingleId.selectedId.value" @click="handleClickCategoryAll">
          All
        </CategoryButton>
      </li>
      <li v-for="category in itemCategories" :key="category">
        <CategoryButton @click="() => handleClickCategory(category)" :is-active="categoryIsSelected(category)">
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
