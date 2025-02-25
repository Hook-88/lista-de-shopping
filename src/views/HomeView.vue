<script setup lang="ts">
import MainNav from '@/components/main-nav/MainNav.vue';
import { GROCERIES } from '@/data/data';
import BaseItem from '@/components/shopping-list/BaseItem.vue';
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds';
import { computed, onMounted } from 'vue';
import { useShoppingListStore } from '@/stores/shoppingList';
import PageHeader from '@/components/page-header/PageHeader.vue';
import ToggleNavButton from '@/components/main-nav/ToggleNavButton.vue';
import ListHeader from '@/components/shopping-list/header/ListHeader.vue';
import AddItemButton from '@/components/shopping-list/add-item/AddItemButton.vue';
import PageFooter from '@/components/page-footer/PageFooter.vue';
import { useSelectSingleId } from '@/features/select-single-id/selectSingleId';

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


//// Item Category
const itemCategories = computed(() => {
  if (!shoppingListStore.items) {
    return
  }

  const allLabels = shoppingListStore.items.map(item => item.label)

  return [...new Set(allLabels)]
})

function handleOnChangeCategory(category: string | null) {
  if (!category) {
    selectSingleId.clearSelection()
    return
  }

  selectSingleId.selectId(category)

}

const selectSingleId = useSelectSingleId()

const displayItems = computed(() => {

  if (selectSingleId.selectedId.value) {
    return shoppingListStore.items?.filter(shoppingItem => shoppingItem.label === selectSingleId.selectedId.value)
  }

  return shoppingListStore.items
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
          :checked-items-length="selectMultipleIds.selectedIds.value.length"
          @on-change-category="handleOnChangeCategory" />

        <ul class="space-y-1.5">
          <BaseItem v-for="item in displayItems" :key="item.id" :item="item" :is-checked="itemIsChecked(item.id)"
            @on-toggle-check="handleOnToggleCheck" />
        </ul>

      </div>


      <button class="p-2 rounded border border-ash/20 bg-red-900">
        Delete checked items
      </button>


    </main>

    <PageFooter />
  </div>
</template>
