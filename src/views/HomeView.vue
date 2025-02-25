<script setup lang="ts">
import MainNav from '@/components/main-nav/MainNav.vue';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { GROCERIES } from '@/data/data';
import BaseItem from '@/components/shopping-list/BaseItem.vue';
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds';

const selectMultipleIds = useSelectMultipleIds()

function handleOnToggleCheck(itemId: string) {
  selectMultipleIds.toggleSelectId(itemId)
}

function itemIsChecked(itemId: string) {
  return selectMultipleIds.selectedIds.value.includes(itemId)
}

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
          <ul class="flex gap-2 mb-2">
            <li>
              <button class="px-2 py-1 border border-ash/20 rounded-xl bg-emerald-800">
                All
              </button>
            </li>
            <li>
              <button class="px-2 py-1 border border-ash/20 rounded-xl">
                Bakery
              </button>
            </li>
          </ul>

          <div class="text-sm mb-1 flex justify-between">
            <span>(4/12)</span>
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
