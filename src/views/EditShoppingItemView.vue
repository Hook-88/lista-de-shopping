<script setup lang="ts">
import ShoppingItemForm, { type FormDatatype } from '@/components/form/add-shopping-item/ShoppingItemForm.vue';
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue';
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { useAddDoc } from '@/features/shopping-list/add-item/addDoc';
import { useRoute } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';
import { doc, updateDoc } from 'firebase/firestore';
import type { ShoppingItemInterface } from '@/types/types';

const addNewDoc = useAddDoc()
const route = useRoute()
const db = useFirestore()

async function handleOnUpdateItem(itemId: string, formData: FormDatatype) {
  const docRef = doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', itemId)

  await updateDoc(docRef, formData)
}

const {
  data: itemData,
  pending: itemLoading,
  error: itemError
} = useDocument<ShoppingItemInterface>(doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', route.params.itemId as string))

</script>

<template>
  <PageHeader class="grid grid-cols-4">

    <IconLink :to="{ name: 'home' }" class="text-base flex items-center gap-1 text-blue-600">
      <IconAngleLeft />
      Back
    </IconLink>

    <h1 class="grow text-center col-span-2 py-1" v-if="itemLoading">
      Loading...
    </h1>

    <h1 class="grow text-center col-span-2 py-1" v-else>
      Edit {{ itemData?.name }}
    </h1>

  </PageHeader>

  <main>
    <div v-if="itemLoading">
      Loading...
    </div>

    <div v-else-if="itemError || !itemData">
      Error...
    </div>

    <ShoppingItemForm v-else @on-update-item="handleOnUpdateItem" :item="itemData" />
  </main>

</template>
