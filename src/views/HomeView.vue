<script setup lang="ts">
import MainNav from '@/components/main-nav/MainNav.vue';
import { GROCERIES } from '@/data/data';
import BaseItem from '@/components/shopping-list/BaseItem.vue';
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds';
import { computed, onMounted, ref } from 'vue';
import { useShoppingListStore } from '@/stores/shoppingList';
import PageHeader from '@/components/page-header/PageHeader.vue';
import ToggleNavButton from '@/components/main-nav/ToggleNavButton.vue';
import ListHeader from '@/components/shopping-list/header/ListHeader.vue';
import AddItemButton from '@/components/shopping-list/add-item/AddItemButton.vue';
import PageFooter from '@/components/page-footer/PageFooter.vue';
import { useCategoryFilter } from '@/components/shopping-list/filter/catergoryFilter';

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


//// Item Category filter
const categoryFilter = useCategoryFilter()

function handleOnChangeCategory(category: string | null) {
  if (!category) {
    categoryFilter.selectCategory.clearSelection()
    return
  }

  categoryFilter.selectCategory.selectId(category)
}


const categoryToDisplay = computed(() => {

  if (categoryFilter.selectCategory.selectedId.value) {
    return shoppingListStore.items?.filter(shoppingItem => shoppingItem.label === categoryFilter.selectCategory.selectedId.value)
  }

  return shoppingListStore.items
})


//// Item unchecked filter
const hideCheckedItems = ref(false)

function handleClickToggleHideChecked() {
  hideCheckedItems.value = !hideCheckedItems.value
}


//Delete checked Items




//Items to display
const displayItems = computed(() => {

  if (hideCheckedItems.value) {

    return categoryToDisplay.value?.filter(item => {

      if (!selectMultipleIds.selectedIds.value.includes(item.id)) {

        return item
      }

    })
  }

  return categoryToDisplay.value
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

      <div v-if="shoppingListStore.items && categoryFilter.itemCategories.value">
        <ListHeader :item-categories="categoryFilter.itemCategories.value" :list-length="shoppingListStore.items.length"
          :checked-items-length="selectMultipleIds.selectedIds.value.length"
          @on-change-category="handleOnChangeCategory" @on-toggle-hide-checked="handleClickToggleHideChecked"
          :hide-checked-items="hideCheckedItems" />

        <ul class="space-y-1.5">
          <BaseItem v-for="item in displayItems" :key="item.id" :item="item" :is-checked="itemIsChecked(item.id)"
            @on-toggle-check="handleOnToggleCheck" />
        </ul>

      </div>


      <button class="p-2 rounded border border-ash/20 bg-red-900 disabled:bg-red-900/50 disabled:text-white/40"
        :disabled="selectMultipleIds.selectedIds.value.length === 0">
        Delete checked items
      </button>


    </main>

    <PageFooter />
  </div>
</template>
