<script setup lang="ts">
import ShoppingItemForm, { type FormDatatype } from '@/components/form/add-shopping-item/ShoppingItemForm.vue';
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue';
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { addDoc, collection } from 'firebase/firestore';
import { ref } from 'vue';
import { useFirestore } from 'vuefire';

const db = useFirestore()

function handleOnFormSubmit(formData: FormDatatype) {
  addNewDoc(formData)
}

const isLoading = ref(false)
const addingError = ref<Error | null>(null)

async function addNewDoc(formData: FormDatatype) {
  isLoading.value = true
  addingError.value = null

  try {
    const docRef = await addDoc(collection(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items'), formData)
  } catch (err) {
    addingError.value = err as Error
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

    <h1 class="grow text-center col-span-2 py-1">Add new item</h1>

  </PageHeader>

  <main>
    <ShoppingItemForm @on-form-submit="handleOnFormSubmit" />
  </main>

  <div v-if="isLoading">
    Loading....
  </div>

  <div v-else-if="addingError">
    Error....
  </div>

</template>
