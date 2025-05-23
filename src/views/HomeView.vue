<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import ButtonLink from '@/components/links/ButtonLink.vue';
import BaseList from '@/components/list/BaseList.vue';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal.vue';
import HomeViewHeader from '@/components/page-header/home-view-header/HomeViewHeader.vue';
import ShoppingItem from '@/components/shopping-list/shopping-item/ShoppingItem.vue';
import ShoppingListFilter from '@/components/shopping-list/shopping-list-filter/ShoppingListFilter.vue';
import { useSelectSingleId } from '@/features/select-single-id/selectSingleId';
import EditItemTools from '@/components/toolbelt/edit-item-tools/EditItemTools.vue';
import { useSelectSingleId } from '@/features/select-single-id/selectSingleId';
import { useCheckItem } from '@/features/shopping-list/check-item/checkItem';
import DeleteList from '@/features/shopping-list/delete-items/DeleteList.vue';
import { useDeleteShoppingItems } from '@/features/shopping-list/delete-items/deleteShoppingItems';
import EditItemToolbar from '@/features/shopping-list/edit-item/edit-item-toolbar/EditItemToolbar.vue';
import { useDisplayShoppingItems } from '@/features/shopping-list/list-filter/displayShoppingItems';
import { useListFilter } from '@/features/shopping-list/list-filter/listFilter';
import type { ShoppingItemInterface } from '@/types/types';
import { collection } from 'firebase/firestore';
import { computed, ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';
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
const { displayItems } = useDisplayShoppingItems(selectFilter.selection, shoppingList)
// Display items //


// Delete items //
const { removeIdFromDeleteList, deleteCheckedItems, confirmDeleteItems, deletingSuccesful, confirmModalRef, itemsTodelete, idsToDelete } = useDeleteShoppingItems(shoppingList)
const toast = useToast()

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

// Select item to edit //
const selectItemToEdit = useSelectSingleId()

function handleSelectItem(itemId: string) {
  selectItemToEdit.selectId(itemId)

  showToolbar()
}

function itemIsSelectedForEdit(itemId: string) {
  return selectItemToEdit.selection.value === itemId
}
// Select item to edit //


// Toolbar //
const editItemToolbarRef = ref<InstanceType<typeof EditItemToolbar> | null>(null)

function showToolbar() {
  editItemToolbarRef.value?.openToolbar()
}

function hideToolbar() {
  editItemToolbarRef.value?.closeToolbar()
}

function handleCloseToolbar() {
  selectItemToEdit.clearSelection()
}
// Toolbar //

// Delete item //
function handleOnDeleteItem(itemId: string) {
  hideToolbar()
  idsToDelete.setSelection([itemId])
  confirmModalRef.value?.openModal()
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
          @on-toggle-check="handleOnToggleCheck" :is-selected="itemIsSelectedForEdit(item.id)"
          @on-select-item="handleSelectItem" />
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

  <ConfirmationModal title="Confirm delete items" ref="confirmModalRef" @on-confirm="handleOnConfirm">
    <h2 class="text-lg mb-1.5">Do you want to delete these items?</h2>
    <DeleteList :items="itemsTodelete" @on-remove-from-list="removeIdFromDeleteList" />
  </ConfirmationModal>

  <EditItemToolbar :item-id="selectItemToEdit.selection" @on-close-toolbar="handleCloseToolbar" ref="editItemToolbarRef"
    @on-delete-item="handleOnDeleteItem" />
</template>
