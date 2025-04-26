<script setup lang="ts">
import ShoppingItemForm, { type FormDatatype } from '@/components/form/add-shopping-item/ShoppingItemForm.vue';
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue';
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { useAddDoc } from '@/features/shopping-list/add-item/addDoc';
import type { ShoppingItemInterface } from '@/types/types';
import { doc, updateDoc } from 'firebase/firestore';
import { ref } from 'vue';
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
  mutateDoc(formData.data)
}

const isUpdating = ref(false)
const updatingError = ref<Error | null>(null)
const toast = useToast()

async function mutateDoc(newItemData: FormDatatype) {
  isUpdating.value = true
  updatingError.value = null

  try {
    await updateDoc(docRef, newItemData)
    toast.success('item updated', {
      duration: 2000,
      position: 'top'
    })

  } catch (error) {
    updatingError.value = error as Error
  } finally {
    isLoading.value = false
  }

}

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
