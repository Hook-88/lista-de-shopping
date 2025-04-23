<script setup lang="ts">
import FilterButton from '@/components/buttons/FilterButton.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import BaseList from '@/components/list/BaseList.vue';
import HomeViewHeader from '@/components/page-header/home-view-header/HomeViewHeader.vue';
import ShoppingItem from '@/components/shopping-list/shopping-item/ShoppingItem.vue';
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds';
import { useSelectSingleId } from '@/features/select-single-id/selectSingleId';
import type { ShoppingItemInterface } from '@/types/types';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { collection } from 'firebase/firestore';
import { computed } from 'vue';
import { useCollection, useFirestore } from 'vuefire';

const db = useFirestore()

const {
  data: shoppingList,
  pending: shoppingListLoading,
  error: shoppingListError
} = useCollection<ShoppingItemInterface>(collection(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items'))

// Check item //
const checkItem = useSelectMultipleIds()

function handleOnToggleCheck(itemId: string) {
  checkItem.toggleSelect(itemId)
}

function itemIsChecked(itemId: string) {
  return checkItem.selection.value.some(selectedId => selectedId === itemId)
}
// Check item //

// List Progress //
const listProgressText = computed(() => {
  return checkItem.selection.value.length === shoppingList.value.length ?
    `(${checkItem.selection.value.length}/${shoppingList.value.length}) - Completed` :
    `(${checkItem.selection.value.length}/${shoppingList.value.length})`
})
// List Progress //

// List Labels //
const listLabels = computed(() => {
  return [...new Set(shoppingList.value.map(shoppingItem => shoppingItem.label))]
})
// List Labels //

// List filter //
const selectFilter = useSelectSingleId()

function handleClickListFilter(label: string) {
  selectFilter.selectId(label)
}

function labelIsSelected(label: string) {
  return selectFilter.selection.value === label
}

function handleClickAllLabels() {
  selectFilter.clearSelection()
}
// List filter //

// Display items //
const displayItems = computed(() => {
  const selectedFilter = selectFilter.selection.value

  if (selectedFilter) {
    return shoppingList.value.filter(shoppingItem => shoppingItem.label === selectedFilter)
  }

  return shoppingList.value
})

</script>

<template>
  <HomeViewHeader />
  <main class="p-2">

    <div v-if="shoppingListLoading">
      Loading...
    </div>

    <div v-else>
      <header>
        <ul class="flex gap-2">
          <li>
            <FilterButton :is-selected="!selectFilter.selection.value" @click="handleClickAllLabels">
              All
            </FilterButton>
          </li>
          <li v-for="(label, index) in listLabels" :key="index">
            <FilterButton :is-selected="labelIsSelected(label)" @click="() => handleClickListFilter(label)">
              {{ label }}
            </FilterButton>
          </li>
        </ul>
        <br>
        <small>{{ listProgressText }}</small>
      </header>

      <BaseList>
        <ShoppingItem v-for="item in displayItems" :key="item.id" :item="item" :is-checked="itemIsChecked(item.id)"
          @on-toggle-check="handleOnToggleCheck" />
      </BaseList>

    </div>


  </main>
</template>
