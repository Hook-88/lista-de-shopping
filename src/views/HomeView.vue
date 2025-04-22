<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import HomeViewHeader from '@/components/page-header/home-view-header/HomeViewHeader.vue';
// import { db } from '@/firebase/firebase';
import type { ShoppingItemInterface } from '@/types/types';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { collection } from 'firebase/firestore';
import { useCollection, useFirestore } from 'vuefire';

const db = useFirestore()

const {
  data: shoppingList,
  pending: shoppingListLoading,
  error: shoppingListError
} = useCollection<ShoppingItemInterface>(collection(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items'))

</script>

<template>
  <HomeViewHeader />
  <main class="p-2">

    <div v-if="shoppingListLoading">
      Loading...
    </div>

    <ul class="space-y-2">
      <li v-for="item in shoppingList" :key="item.id"
        class="border border-ivory/20 rounded-sm text-lg pl-2 flex items-center gap-1">

        {{ item.name }}
        <span class="text-sm">
          ({{ item.quantity }} {{ item.unit }})
        </span>

        <IconButton class="ml-auto">
          <FontAwesomeIcon :icon="faCircle" />
        </IconButton>

      </li>
    </ul>

  </main>
</template>
