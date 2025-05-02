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
import { useSelectSingleId } from '@/features/select-single-id/selectSingleId';
import FavItemButton from '@/features/shopping-list/add-item/components/fav-item-button/FavItemButton.vue';
import ShoppingItemFormTwo from '@/components/form/add-shopping-item/ShoppingItemFormTwo.vue';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal.vue';
import { useDeleteDoc } from '@/features/firestore/deleteDoc';

const { add, isLoading } = useAddDoc('/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items')
const addFavItem = useAddDoc('/favorite-shopping-items')

function handleOnFormSubmit(formData: FormDatatype, itemId: string | undefined) {

  if (itemId === undefined && formData.isFavorite) {
    addFavItem.add(formData)
  }

  add(formData)
  selectSingleFavItem.clearSelection()
  itemForForm.value = undefined
}

const db = useFirestore()
const collectionRef = collection(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items')
const favItemsCollectionRef = collection(db, '/favorite-shopping-items')

const {
  data: shoppingList,
} = useCollection<ShoppingItemInterface>(collectionRef)

const {
  data: favoriteItems,
  pending: favoriteItemsLoading,
  error: favoriteItemsError
} = useCollection<ShoppingItemInterface>(favItemsCollectionRef)


const shoppingListLabels = computed(() => {

  return [...new Set(shoppingList.value.map(shoppingItem => shoppingItem.label))]
})

const selectSingleFavItem = useSelectSingleId()

const selectedFavItem = computed(() => {
  if (!selectSingleFavItem.selection.value) {
    return undefined
  }

  return favoriteItems.value.find(item => item.id === selectSingleFavItem.selection.value)
})

function handleOnSelectFavItem(itemId: string) {
  selectSingleFavItem.toggleSelect(itemId)

  itemForForm.value = selectedFavItem.value
}

function favItemIsSelected(itemId: string) {
  return selectSingleFavItem.selection.value === itemId
}

// Refactor this
function handleToggleFavorite(favItemObj: {
  itemId: string | undefined
  favValue: boolean
}) {

  if (favItemObj.itemId) {

    openConfirmModal()

    return
  }

  console.log('new item')
}


const confirmationModalRef = ref<InstanceType<typeof ConfirmationModal> | null>(null)
const { deleteDocument } = useDeleteDoc('/favorite-shopping-items')

function openConfirmModal() {
  confirmationModalRef.value?.openModal()
}

function closeConfirmModal() {
  confirmationModalRef.value?.closeModal()
}

async function handleOnConfirmRemove() {

  await deleteDocument(selectedFavItem.value!.id)

  if (itemForForm.value) {
    itemForForm.value = { ...itemForForm.value, isFavorite: false }
  }

  selectSingleFavItem.clearSelection()

  closeConfirmModal()
}

const itemForForm = ref<ShoppingItemInterface | undefined>()

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
    <ShoppingItemFormTwo @on-form-submit="handleOnFormSubmit" :submit-button-disabled="isLoading"
      :label-options="shoppingListLabels" :item="itemForForm" @on-toggle-favorite="handleToggleFavorite" />
    <section class="p-2 flex gap-2 flex-wrap">
      <FavItemButton v-for="item in favoriteItems" :key="item.id" :item="item" :is-selected="favItemIsSelected(item.id)"
        @on-select-fav-item="handleOnSelectFavItem" />
    </section>
  </main>

  <ConfirmationModal title="Remove item from fav-list?" ref="confirmationModalRef" @on-confirm="handleOnConfirmRemove">
    Do you want to remove {{ selectedFavItem?.name }} from your favorite list?
  </ConfirmationModal>

</template>
