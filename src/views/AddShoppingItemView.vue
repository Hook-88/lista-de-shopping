<script setup lang="ts">
import ShoppingItemForm, { type FormDatatype } from '@/components/form/add-shopping-item/ShoppingItemForm.vue';
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue';
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { useAddDoc } from '@/features/shopping-list/add-item/addDoc';
import { collection } from 'firebase/firestore';
import { useCollection, useFirestore } from 'vuefire';
import type { ShoppingItemInterface } from '@/types/types';
import { computed } from 'vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import { useSelectSingleId } from '@/features/select-single-id/selectSingleId';
import FavItemButton from '@/features/shopping-list/add-item/components/fav-item-button/FavItemButton.vue';

const { add, isLoading } = useAddDoc('/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items')
const addFavItem = useAddDoc('/favorite-shopping-items')

function handleOnFormSubmit(formData: FormDatatype) {
  const favoriteNames = favoriteItems.value.map(item => item.name)


  if (formData.isFavorite && !favoriteNames.includes(formData.name)) {
    addFavItem.add(formData)
  }


  add(formData)
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

function handleOnSelectFavItem(itemId: string) {
  selectSingleFavItem.toggleSelect(itemId)
}

function favItemIsSelected(itemId: string) {
  return selectSingleFavItem.selection.value === itemId
}

const selectedFavItem = computed(() => {
  if (!selectSingleFavItem.selection.value) {
    return undefined
  }

  return favoriteItems.value.find(item => item.id === selectSingleFavItem.selection.value)
})

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
    <ShoppingItemForm @on-form-submit="handleOnFormSubmit" :submit-button-disabled="isLoading"
      :label-options="shoppingListLabels" :item="selectedFavItem" />
    <section class="p-2 flex gap-2">
      <FavItemButton v-for="item in favoriteItems" :key="item.id" :item="item" :is-selected="favItemIsSelected(item.id)"
        @on-select-fav-item="handleOnSelectFavItem" />
    </section>
  </main>

</template>
