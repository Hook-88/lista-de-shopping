<script setup lang="ts">
import MainNav from '@/components/main-nav/MainNav.vue';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { GROCERIES } from '@/data/data';
import BaseItem from '@/components/shopping-list/BaseItem.vue';
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds';
import { computed, onMounted } from 'vue';
import CategoryButton from '@/components/shopping-list/header/item-category/CategoryButton.vue';
import { useShoppingListStore } from '@/stores/shoppingList';
import PageHeader from '@/components/page-header/PageHeader.vue';
import ToggleNavButton from '@/components/main-nav/ToggleNavButton.vue';
import ListHeader from '@/components/shopping-list/header/ListHeader.vue';
import AddItemButton from '@/components/shopping-list/add-item/AddItemButton.vue';
import PageFooter from '@/components/page-footer/PageFooter.vue';

//Get shopping Items
const shoppingListStore = useShoppingListStore()

onMounted(() => {
  shoppingListStore.items = GROCERIES
})

////CheckItem
const selectMultipleIds = useSelectMultipleIds()

function handleOnToggleCheck(itemId: string) {
  selectMultipleIds.toggleSelectId(itemId)
}

function itemIsChecked(itemId: string) {
  return selectMultipleIds.selectedIds.value.includes(itemId)
}

const listProgressText = computed(() => {
  if (!shoppingListStore.items) {
    return
  }

  if (selectMultipleIds.selectedIds.value.length === shoppingListStore.items.length) {
    return `(${selectMultipleIds.selectedIds.value.length}/${shoppingListStore.items.length}) - Completed`
  }

  return `(${selectMultipleIds.selectedIds.value.length}/${shoppingListStore.items.length})`
})


//// ItemCategory
const itemCategories = computed(() => {
  if (!shoppingListStore.items) {
    return
  }

  const allLabels = shoppingListStore.items.map(item => item.label)

  return [...new Set(allLabels)]
})


</script>

<template>
  <div class="flex flex-col min-h-screen gap-2">

    <PageHeader>

      <ToggleNavButton>
        La Lista
      </ToggleNavButton>

      <MainNav />

      <AddItemButton />

    </PageHeader>

    <main class="grow px-2 flex flex-col gap-4">

      <div v-if="shoppingListStore.items && itemCategories">
        <ListHeader :item-categories="itemCategories" :list-length="shoppingListStore.items.length"
          :checked-items-length="selectMultipleIds.selectedIds.value.length" />

        <ul class="space-y-1.5">
          <BaseItem v-for="item in shoppingListStore.items" :key="item.id" :item="item"
            :is-checked="itemIsChecked(item.id)" @on-toggle-check="handleOnToggleCheck" />
        </ul>

      </div>


      <button class="p-2 rounded border border-ash/20 bg-red-900">
        Delete checked items
      </button>


    </main>

    <PageFooter />
  </div>
</template>
