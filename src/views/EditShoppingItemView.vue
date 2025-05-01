<script setup lang="ts">
import ShoppingItemForm, { type FormDatatype } from '@/components/form/add-shopping-item/ShoppingItemForm.vue';
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue';
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { useRoute } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';
import { doc } from 'firebase/firestore';
import type { ShoppingItemInterface } from '@/types/types';
import { watch } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useUpdateShoppingItem } from '@/features/shopping-list/edit-item/update-item/updateShoppingItem';

const route = useRoute()
const db = useFirestore()
const toast = useToast()

const {
  data: itemData,
  pending: itemLoading,
  error: itemError
} = useDocument<ShoppingItemInterface>(doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', route.params.itemId as string))

const { updateSuccesfull, updateShoppingItem, isUpdating } = useUpdateShoppingItem()

async function handleOnUpdateItem(itemId: string, formData: FormDatatype) {
  const docRef = doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', itemId)

  await updateShoppingItem(docRef, formData)
}

watch(
  () => updateSuccesfull.value,
  (succes: boolean) => {

    if (succes) {
      toast.success('item updated', {
        position: 'top',
        duration: 2000
      })
    }

  }
)


</script>

<template>
  <PageHeader class="grid grid-cols-4">

    <IconLink :to="{ name: 'home' }" class="text-base flex items-center gap-1 text-blue-600">
      <IconAngleLeft />
      Back
    </IconLink>

    <h1 class="grow text-center col-span-2 py-1.5 text-xl" v-if="itemLoading">
      Loading...
    </h1>

    <h1 class="grow text-center col-span-2 py-1.5 text-xl" v-else>
      Edit shopping item
    </h1>

  </PageHeader>

  <main>
    <div v-if="itemLoading">
      Loading...
    </div>

    <div v-else-if="itemError || !itemData">
      {{ itemError }}
    </div>

    <ShoppingItemForm v-else @on-update-item="handleOnUpdateItem" :item="itemData"
      :submit-button-disabled="isUpdating" />
  </main>

</template>
