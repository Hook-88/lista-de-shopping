<script setup lang="ts">
import ShoppingItemForm, { type FormDatatype } from '@/components/form/add-shopping-item/ShoppingItemForm.vue';
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue';
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { useAddDoc } from '@/features/shopping-list/add-item/addDoc';
import { collection } from 'firebase/firestore';
import { useCollection, useFirestore } from 'vuefire';
import type { ShoppingItemInterface } from '@/types/types';
import { computed, ref } from 'vue';
import FavItemButton from '@/features/shopping-list/add-item/components/fav-item-button/FavItemButton.vue';
import ShoppingItemFormTwo from '@/components/form/add-shopping-item/ShoppingItemFormTwo.vue';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal.vue';
import { useDeleteDoc } from '@/features/firestore/deleteDoc';
import { useSelectFavItem } from '@/features/shopping-list/add-item/select-fav-item/selectFavItem';
import { useConfirmRemoveModal } from '@/features/shopping-list/add-item/confirmRemoveModal';

const {
  add: addShoppingItem,
  isLoading: addingShoppingItem
} = useAddDoc('/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items')

const {
  add: addFavItem
} = useAddDoc('/favorite-shopping-items')

const db = useFirestore()
const collectionRef = collection(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items')

const { data: shoppingList, } = useCollection<ShoppingItemInterface>(collectionRef)

const favItemsCollectionRef = collection(db, '/favorite-shopping-items')

const {
  data: favoriteItems,
  pending: favoriteItemsLoading,
  error: favoriteItemsError
} = useCollection<ShoppingItemInterface>(favItemsCollectionRef)


const shoppingListLabels = computed(() => {

  return [...new Set(shoppingList.value.map(shoppingItem => shoppingItem.label))]
})

// select fav item //
const { selectedFavItem, toggleSelectFavItem, clearSelection: clearFavItemSelection, favItemIsSelected } = useSelectFavItem(favoriteItems)

const itemForForm = ref<ShoppingItemInterface | undefined>()

function handleOnSelectFavItem(itemId: string) {
  toggleSelectFavItem(itemId)

  itemForForm.value = selectedFavItem.value
}

// TODO Why do i need the favValue? //
function handleToggleFavorite(favItemObj: {
  itemId: string | undefined
  favValue: boolean
}) {

  if (favItemObj.itemId) {

    openConfirmModal()

    return
  }
}
// select fav item //

function handleOnFormSubmit(formData: FormDatatype, itemId: string | undefined) {
  // if it's a new item and it's marked favorite, add to fav list
  if (itemId === undefined && formData.isFavorite) {
    addFavItem(formData)
  }

  addShoppingItem(formData)
  clearFavItemSelection()
  itemForForm.value = undefined
}

// remove item from fav-list modal //
const { confirmationModalRef, closeConfirmModal, openConfirmModal } = useConfirmRemoveModal()
// remove item from fav-list modal //

// remove item from fav-list //
const { deleteDocument: removeDocFormFavList } = useDeleteDoc('/favorite-shopping-items')

async function handleOnConfirmRemove() {

  await removeDocFormFavList(selectedFavItem.value!.id)

  // Keep form filled but set isFav to false
  if (itemForForm.value) {
    itemForForm.value = { ...itemForForm.value, isFavorite: false }
  }

  clearFavItemSelection()
  closeConfirmModal()
}
// remove item from fav-list //


</script>

<template>
  <PageHeader class="grid grid-cols-4">

    <IconLink :to="{ name: 'home' }" class="text-base flex items-center gap-1 text-blue-600">
      <IconAngleLeft />
      Back
    </IconLink>

    <h1 class="grow text-center col-span-2 py-1">Add new item</h1>

  </PageHeader>

  <main>
    <ShoppingItemFormTwo @on-form-submit="handleOnFormSubmit" :submit-button-disabled="addingShoppingItem"
      :label-options="shoppingListLabels" :item="itemForForm" @on-toggle-favorite="handleToggleFavorite" />
    <section class="p-4 flex gap-2 flex-wrap">
      <h2 v-if="favoriteItemsLoading">Loading...</h2>

      <FavItemButton v-else v-for="item in favoriteItems" :key="item.id" :item="item"
        :is-selected="favItemIsSelected(item.id)" @on-select-fav-item="handleOnSelectFavItem" />
    </section>

  </main>

  <ConfirmationModal title="Remove item from fav-list?" ref="confirmationModalRef" @on-confirm="handleOnConfirmRemove">
    Do you want to remove {{ selectedFavItem?.name }} from your favorite list?
  </ConfirmationModal>

</template>
