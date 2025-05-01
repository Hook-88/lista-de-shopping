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

const { add, isLoading } = useAddDoc()

function handleOnFormSubmit(formData: FormDatatype) {
  add(formData)
}

const db = useFirestore()
const collectionRef = collection(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items')

const {
  data: shoppingList,
} = useCollection<ShoppingItemInterface>(collectionRef)

const shoppingListLabels = computed(() => {

  return [...new Set(shoppingList.value.map(shoppingItem => shoppingItem.label))]
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
      :label-options="shoppingListLabels" />
  </main>

</template>
