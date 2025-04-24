<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import IconAngleLeft from '@/components/icons/IconAngleLeft.vue';
import IconStar from '@/components/icons/IconStar.vue';
import BaseInput from '@/components/inputs/BaseInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import IsFavoriteButton from '@/features/shopping-list/add-item/components/is-favorite-button/IsFavoriteButton.vue';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';

const itemIsFavorite = ref(false)

function toggleIsFavorite() {
  itemIsFavorite.value = !itemIsFavorite.value
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
    <form>
      <section class="p-2 flex flex-col gap-2">

        <div class="flex">

          <div class="flex flex-col grow">
            <TextInput label="Name" placeholder="Item name..." />
          </div>

          <IsFavoriteButton :is-favorite="itemIsFavorite" class="self-stretch flex text-2xl mb-0.5 items-end pr-0"
            @click="toggleIsFavorite" />

          <!-- <IconButton type="button" class="self-stretch flex text-2xl mb-0.5 items-end pr-0" @click="toggleIsFavorite">
            <IconStar :variant="itemIsFavorite ? 'solid' : 'regular'" />
          </IconButton> -->

        </div>



        <div class="flex gap-2">

          <div class="flex flex-col w-20">
            <BaseInput label="Quantity" type="number" class="px-2 py-1 rounded bg-ivory/10" />
          </div>

          <div class="flex flex-col grow">
            <TextInput label="Unit" placeholder="Item unit..." class="w-full" />
          </div>
        </div>



        <div class="flex flex-col grow">
          <TextInput label="Label" placeholder="Item label..." class="w-full" />
        </div>








      </section>
      <footer class="p-2 border-y border-ivory/20 flex gap-2">
        <BaseButton variant="action" class="grow">Add item</BaseButton>
        <BaseButton variant="danger" type="button">Cancel</BaseButton>
      </footer>
    </form>

  </main>

</template>
