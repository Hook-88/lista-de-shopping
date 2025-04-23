<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import BaseList from '@/components/list/BaseList.vue';
import BaseModal from '@/components/modal/BaseModal.vue';
import HomeViewHeader from '@/components/page-header/home-view-header/HomeViewHeader.vue';
import ShoppingItem from '@/components/shopping-list/shopping-item/ShoppingItem.vue';
import ShoppingListFilter from '@/components/shopping-list/shopping-list-filter/ShoppingListFilter.vue';
import { useCheckItem } from '@/features/shopping-list/check-item/checkItem';
import { useListFilter } from '@/features/shopping-list/list-filter/listFilter';
import type { ShoppingItemInterface } from '@/types/types';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { computed, ref } from 'vue';
import { useCollection, useFirestore } from 'vuefire';

const db = useFirestore()

const {
  data: shoppingList,
  pending: shoppingListLoading,
  error: shoppingListError
} = useCollection<ShoppingItemInterface>(collection(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items'))

// Check item //
const { checkItem, handleOnToggleCheck, itemIsChecked } = useCheckItem()
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
const { selectFilter, handleOnClearFilter, handleOnSelectLabel } = useListFilter()
// List filter //

// Display items //
const displayItems = computed(() => {
  const selectedFilter = selectFilter.selection.value

  if (selectedFilter) {
    return shoppingList.value.filter(shoppingItem => shoppingItem.label === selectedFilter)
  }

  return shoppingList.value
})
// Display items //


// Delete items //
const checkedItems = computed(() => {
  return shoppingList.value.filter(shoppingItem => {

    if (checkItem.selection.value.some(checkedId => checkedId === shoppingItem.id)) {
      return shoppingItem
    }
  })
})

const confirmModalRef = ref<InstanceType<typeof BaseModal> | null>(null)

function handleClickDeleteCheckedItems() {
  confirmModalRef.value?.openModal()
}

async function handleOnConfirm() {
  const batch = writeBatch(db)

  checkedItems.value.forEach(checkedItem => {
    const docRef = doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', checkedItem.id)
    batch.delete(docRef)
  })

  await batch.commit()

  confirmModalRef.value?.closeModal()
  checkItem.clearSelection()
}
// Delete items

</script>

<template>
  <HomeViewHeader />

  <main class="p-2">


    <div v-if="shoppingListLoading">
      Loading...
    </div>

    <div v-else-if="shoppingListError">
      {{ shoppingListError.message }}
    </div>

    <div v-else>

      <header>
        <ShoppingListFilter :list-labels="listLabels" :selected-label="selectFilter.selection.value"
          @on-clear-filter="handleOnClearFilter" @on-select-label="handleOnSelectLabel" />

        <small>{{ listProgressText }}</small>

      </header>

      <BaseList>
        <ShoppingItem v-for="item in displayItems" :key="item.id" :item="item" :is-checked="itemIsChecked(item.id)"
          @on-toggle-check="handleOnToggleCheck" />
      </BaseList>

      <BaseButton variant="danger" class="w-full mt-4 text-lg disabled:bg-red-950 disabled:text-ivory/50"
        :disabled="checkItem.selection.value.length === 0" @click="handleClickDeleteCheckedItems">
        Delete Checked Items
      </BaseButton>

    </div>


  </main>

  <BaseModal title="Confirm delete items" ref="confirmModalRef" @on-confirm="handleOnConfirm">
    <h2 class="text-lg mb-1.5">Do you want to delete these items?</h2>
    <ul class="space-y-0.5">
      <li v-for="item in checkedItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </BaseModal>

</template>
