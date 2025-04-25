<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import ButtonLink from '@/components/links/ButtonLink.vue';
import BaseList from '@/components/list/BaseList.vue';
import BaseModal from '@/components/modal/BaseModal.vue';
import HomeViewHeader from '@/components/page-header/home-view-header/HomeViewHeader.vue';
import ShoppingItem from '@/components/shopping-list/shopping-item/ShoppingItem.vue';
import ShoppingListFilter from '@/components/shopping-list/shopping-list-filter/ShoppingListFilter.vue';
import BaseToolbelt from '@/components/toolbelt/BaseToolbelt.vue';
import EditItemTools from '@/components/toolbelt/edit-item-tools/EditItemTools.vue';
import { useSelectSingleId } from '@/features/select-single-id/selectSingleId';
import { useCheckItem } from '@/features/shopping-list/check-item/checkItem';
import { useDeleteItems } from '@/features/shopping-list/delete-items/deleteItems';
import DeleteList from '@/features/shopping-list/delete-items/DeleteList.vue';
import { useListFilter } from '@/features/shopping-list/list-filter/listFilter';
import type { ShoppingItemInterface } from '@/types/types';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
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
const { checkItem, itemIsChecked } = useCheckItem()

function handleOnToggleCheck(itemId: string) {
  checkItem.toggleSelect(itemId)
  selectItemEdit.clearSelection()
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
const { idsToDelete, confirmModalRef, itemsTodelete, handleOnRemoveFromList, deleteDocs } = useDeleteItems(shoppingList)

function handleClickDeleteCheckedItems() {
  idsToDelete.setSelection(checkItem.selection.value)
  confirmModalRef.value?.openModal()
}

async function handleOnConfirm() {
  deleteDocs()
  checkItem.clearSelection()

}
// Delete items

// Edit item //
const selectItemEdit = useSelectSingleId()

function itemIsSelectedToEdit(itemId: string) {
  return selectItemEdit.selection.value === itemId
}

function handleOnEditItem(itemId: string) {
  selectItemEdit.selectId(itemId)
}

function handleOnCloseEditTools() {
  selectItemEdit.clearSelection()
}


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

    <div v-else-if="shoppingList.length > 0">

      <header>
        <ShoppingListFilter :list-labels="listLabels" :selected-label="selectFilter.selection.value"
          @on-clear-filter="handleOnClearFilter" @on-select-label="handleOnSelectLabel" />

        <small>{{ listProgressText }}</small>

      </header>

      <BaseList>
        <ShoppingItem v-for="item in displayItems" :key="item.id" :item="item" :is-checked="itemIsChecked(item.id)"
          @on-toggle-check="handleOnToggleCheck" :is-selected="itemIsSelectedToEdit(item.id)"
          @on-edit-item="handleOnEditItem" />
      </BaseList>

      <BaseButton variant="danger" class="w-full mt-4 text-lg disabled:bg-red-950 disabled:text-ivory/50"
        :disabled="checkItem.selection.value.length === 0" @click="handleClickDeleteCheckedItems">
        Delete Checked Items
      </BaseButton>

    </div>

    <div v-else class="flex">
      <ButtonLink variant="action" to="/shopping-list/add-item" class="grow text-center">
        Start adding items
      </ButtonLink>
    </div>

  </main>

  <EditItemTools v-if="selectItemEdit.selection.value" @on-close-edit-tools="handleOnCloseEditTools" />

  <BaseModal title="Confirm delete items" ref="confirmModalRef" @on-confirm="handleOnConfirm">
    <h2 class="text-lg mb-1.5">Do you want to delete these items?</h2>
    <DeleteList :items="itemsTodelete" @on-remove-from-list="handleOnRemoveFromList" />
  </BaseModal>

</template>
