<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import BaseList from '@/components/list/BaseList.vue';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal.vue';
import HomeViewHeader from '@/components/page-header/home-view-header/HomeViewHeader.vue';
import ShoppingItem from '@/components/shopping-list/shopping-item/ShoppingItem.vue';
import ShoppingListFilter from '@/components/shopping-list/shopping-list-filter/ShoppingListFilter.vue';
import { useCheckItem } from '@/features/shopping-list/check-item/checkItem';
import DeleteList from '@/features/shopping-list/delete-items/DeleteList.vue';
import { useDeleteShoppingItems } from '@/features/shopping-list/delete-items/deleteShoppingItems';
import { useListFilter } from '@/features/shopping-list/list-filter/listFilter';
import { useListProgressText } from '@/features/shopping-list/list-progress-text/listProgressText';
import type { ShoppingItemInterface } from '@/types/types';
import { collection } from 'firebase/firestore';
import { computed, watch } from 'vue';
import { useToast } from 'vue-toast-notification';
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
// const { text } = useListProgressText({
//   numOfCheckedItems: checkItem.selection.value.length,
//   numOfShoppingItems: shoppingList.value.length
// })

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
const { removeIdFromDeleteList, deleteCheckedItems, confirmDeleteItems, deletingSuccesful, confirmModalRef, itemsTodelete, idsToDelete } = useDeleteShoppingItems(shoppingList)
const toast = useToast()

function handleOnRemoveFromList(itemId: string) {
  removeIdFromDeleteList(itemId)
}

function handleClickDeleteCheckedItems() {
  deleteCheckedItems(checkItem.selection.value)
}

async function handleOnConfirm() {
  confirmDeleteItems()

  const noDeleteCheckedIds = checkItem.selection.value.filter(checkedId => {

    if (!idsToDelete.selection.value.includes(checkedId)) {

      return checkedId
    }
  })

  checkItem.setSelection(noDeleteCheckedIds)
}

watch(
  () => deletingSuccesful.value,
  (succes: boolean) => {
    if (succes) {
      toast.success('Items Deleted', {
        position: 'top',
        duration: 2000
      })

    }
  }
)
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

  <ConfirmationModal title="Confirm delete items" ref="confirmModalRef" @on-confirm="handleOnConfirm">
    <h2 class="text-lg mb-1.5">Do you want to delete these items?</h2>
    <DeleteList :items="itemsTodelete" @on-remove-from-list="handleOnRemoveFromList" />
  </ConfirmationModal>

</template>
