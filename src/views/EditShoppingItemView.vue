<script setup lang="ts">
import ShoppingItemForm, { type FormDatatype } from '@/components/form/add-shopping-item/ShoppingItemForm.vue';
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue';
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { useMutateDoc } from '@/features/shopping-list/edit-item/mutateDoc';
import type { ShoppingItemInterface } from '@/types/types';
import { doc } from 'firebase/firestore';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useDocument, useFirestore } from 'vuefire';

const route = useRoute()
const db = useFirestore()
const docRef = doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', route.params.itemId as string)
const {
  data: shoppingItem,
  pending: isLoading,
  error,
} = useDocument<ShoppingItemInterface>(docRef)

function handleOnUpdateItem(formData: {
  data: FormDatatype,
  id: string
}) {
  mutateDoc(docRef, formData.data)

  if (updateSuccesfull.value) {
    toast.success('item updated', {
      duration: 2000,
      position: 'top'
    })
  }
}

const { mutateDoc, updateSuccesfull } = useMutateDoc()

const toast = useToast()

</script>

<template>
  <PageHeader class="grid grid-cols-4">

    <IconLink :to="{ name: 'home' }" class="text-base flex items-center gap-1 text-blue-600">
      <IconAngleLeft />
      Back
    </IconLink>

    <h1 v-if="isLoading" class="grow text-center col-span-2 py-1">Loading...</h1>
    <h1 v-else class="grow text-center col-span-2 py-1">Edit {{ shoppingItem?.name }}</h1>

  </PageHeader>

  <main>
    <div v-if="isLoading">
      Loading...
    </div>
    <ShoppingItemForm v-else @on-update-item="handleOnUpdateItem" :item="shoppingItem!" />
  </main>

</template>
