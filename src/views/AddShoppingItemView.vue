<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue';
import BaseInput from '@/components/inputs/BaseInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import IsFavoriteButton from '@/features/shopping-list/add-item/components/is-favorite-button/IsFavoriteButton.vue';
import type { ShoppingItemInterface } from '@/types/types';
import { reactive } from 'vue';

type FormDatatype = Omit<ShoppingItemInterface, 'id'>

function toggleIsFavorite() {
  formData.isFavorite = !formData.isFavorite
}

const formData = reactive<FormDatatype>({
  isFavorite: false,
  label: 'General',
  name: '',
  quantity: 1,
  unit: 'pieces'
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
    <form>
      <section class="p-2 flex flex-col gap-2">

        <div class="flex">

          <div class="flex flex-col grow">
            <TextInput label="Name" placeholder="Item name..." required />
          </div>

          <IsFavoriteButton :is-favorite="formData.isFavorite" class="self-stretch flex text-2xl mb-0.5 items-end pr-0"
            @click="toggleIsFavorite" />

        </div>



        <div class="flex gap-2">

          <div class="flex flex-col w-20">
            <BaseInput label="Quantity" type="number" class="px-2 py-1 rounded bg-ivory/10" required />
          </div>

          <div class="flex flex-col grow">
            <TextInput label="Unit" placeholder="Item unit..." class="w-full" required />
          </div>
        </div>



        <div class="flex flex-col grow">
          <TextInput label="Label" placeholder="Item label..." class="w-full" required />
        </div>








      </section>
      <footer class="p-2 border-y border-ivory/20 flex gap-2">
        <BaseButton variant="action" class="grow">Add item</BaseButton>
        <BaseButton variant="danger" type="button">Cancel</BaseButton>
      </footer>
    </form>

  </main>

</template>
