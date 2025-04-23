<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import BaseList from '@/components/list/BaseList.vue';
import HomeViewHeader from '@/components/page-header/home-view-header/HomeViewHeader.vue';
import ShoppingItem from '@/components/shopping-list/shopping-item/ShoppingItem.vue';
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds';
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

const checkItem = useSelectMultipleIds()

function handleOnToggleCheck(itemId: string) {
  checkItem.toggleSelect(itemId)
}

function itemIsChecked(itemId: string) {
  return checkItem.selection.value.some(selectedId => selectedId === itemId)
}

</script>

<template>
  <HomeViewHeader />
  <main class="p-2">

    <div v-if="shoppingListLoading">
      Loading...
    </div>

    <BaseList>
      <ShoppingItem v-for="item in shoppingList" :key="item.id" :item="item" :is-checked="itemIsChecked(item.id)"
        @on-toggle-check="handleOnToggleCheck" />
    </BaseList>

  </main>
</template>
