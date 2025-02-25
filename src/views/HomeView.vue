<script setup lang="ts">
import MainNav from '@/components/main-nav/MainNav.vue';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { GROCERIES } from '@/data/data';
import BaseItem from '@/components/shopping-list/BaseItem.vue';
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds';
import { computed } from 'vue';
import CategoryButton from '@/components/shopping-list/header/item-category/CategoryButton.vue';


////CheckItem
const selectMultipleIds = useSelectMultipleIds()

function handleOnToggleCheck(itemId: string) {
  selectMultipleIds.toggleSelectId(itemId)
}

function itemIsChecked(itemId: string) {
  return selectMultipleIds.selectedIds.value.includes(itemId)
}

const listProgressText = computed(() => {
  if (selectMultipleIds.selectedIds.value.length === GROCERIES.length) {
    return `(${selectMultipleIds.selectedIds.value.length}/${GROCERIES.length}) - Completed`
  }

  return `(${selectMultipleIds.selectedIds.value.length}/${GROCERIES.length})`
})


//// ItemCategory
const itemCategories = computed(() => {
  const allLabels = GROCERIES.map(item => item.label)

  return [...new Set(allLabels)]
})


</script>

<template>
  <div class="flex flex-col min-h-screen gap-2">
    <header class="text-xl flex justify-between items-center border-b border-ash/20">

      <button class="p-2 flex items-center gap-2" popovertarget="main-nav">
        La Lista
        <FontAwesomeIcon :icon="faCaretDown" />
      </button>
      <MainNav />

      <button class="p-2">
        <FontAwesomeIcon :icon="faPlus" />
      </button>

    </header>

    <main class="grow px-2 flex flex-col gap-4">

      <div>

        <header>
          <ul class="flex gap-2 mb-2 flex-wrap">
            <li>
              <CategoryButton :is-active="true">
                All
              </CategoryButton>
            </li>
            <li v-for="category in itemCategories" :key="category">
              <CategoryButton>
                {{ category }}
              </CategoryButton>
            </li>
          </ul>

          <div class="text-sm mb-1 flex justify-between">
            <span>{{ listProgressText }}</span>
            <button>
              Hide checked
            </button>
          </div>

        </header>

        <ul class="space-y-1.5">
          <BaseItem v-for="item in GROCERIES" :key="item.id" :item="item" :is-checked="itemIsChecked(item.id)"
            @on-toggle-check="handleOnToggleCheck" />
        </ul>

      </div>

      <button class="p-2 rounded border border-ash/20 bg-red-900">
        Delete checked items
      </button>

    </main>

    <footer class="py-2 text-center text-sm">
      &copy; 2025 Hook-88
    </footer>
  </div>
</template>
