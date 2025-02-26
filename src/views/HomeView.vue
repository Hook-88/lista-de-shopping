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
import BaseButton from '@/components/buttons/BaseButton.vue';
import BaseModal from '@/components/modal/BaseModal.vue';
import ConfirmDeleteModal from '@/components/shopping-list/delete-checked-items/ConfirmDeleteModal.vue';
import BaseInput from '@/components/inputs/BaseInput.vue';
import ItemFrom from '@/components/shopping-list/add-item/ItemForm.vue';
import ItemForm from '@/components/shopping-list/add-item/ItemForm.vue';

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
const confirmDeleteModalRef = ref<InstanceType<typeof BaseModal> | null>(null)

function handleClickDeleteCheckedItems() {
  confirmDeleteModalRef.value?.openModal()
}

const itemsToDelete = computed(() => {
  return shoppingListStore.items?.filter(shoppingItem => {

    if (selectMultipleIds.selectedIds.value.includes(shoppingItem.id)) {

      return shoppingItem
    }
  }).map(item => item.name)
})

function handleOnCancelDelete() {
  confirmDeleteModalRef.value?.closeModal()
}

function handleOnConfirmDelete() {
  shoppingListStore.deleteSelectedItems(selectMultipleIds.selectedIds.value)
  selectMultipleIds.clearSelection()
  categoryFilter.selectCategory.clearSelection()
  confirmDeleteModalRef.value?.closeModal()

}


////Add new item
const addnewItemModalRef = ref<InstanceType<typeof BaseModal> | null>(null)

function handleClickAddNewItem() {
  addnewItemModalRef.value?.openModal()
}


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

      <AddItemButton @click="handleClickAddNewItem" />

    </PageHeader>

    <main class="grow px-2 flex flex-col" v-if="shoppingListStore.items">
      <BaseButton button-type="action" v-if="shoppingListStore.items.length === 0">
        Add item
      </BaseButton>

      <div v-else class="flex flex-col gap-4">
        <div>
          <ListHeader :item-categories="categoryFilter.itemCategories.value"
            :list-length="shoppingListStore.items.length"
            :checked-items-length="selectMultipleIds.selectedIds.value.length"
            @on-change-category="handleOnChangeCategory" @on-toggle-hide-checked="handleClickToggleHideChecked"
            :hide-checked-items="hideCheckedItems" />

          <ul class="space-y-1.5">
            <BaseItem v-for="item in displayItems" :key="item.id" :item="item" :is-checked="itemIsChecked(item.id)"
              @on-toggle-check="handleOnToggleCheck" />
          </ul>

        </div>


        <button class="p-2 rounded border border-ash/20 bg-red-900 disabled:bg-red-900/50 disabled:text-white/40"
          :disabled="selectMultipleIds.selectedIds.value.length === 0" @click="handleClickDeleteCheckedItems">
          Delete checked items
        </button>

      </div>


    </main>

    <PageFooter />

    <BaseModal ref="confirmDeleteModalRef">
      <ConfirmDeleteModal :items-to-delete="itemsToDelete" @on-cancel-delete="handleOnCancelDelete"
        @on-confirm-delete="handleOnConfirmDelete" />
    </BaseModal>

    <BaseModal ref="addnewItemModalRef">
      <ItemForm />
      <!-- <form>
        <div class="p-2 flex flex-col gap-2 pb-3">
          <BaseInput label="Name" />

          <div class="flex gap-2">

            <div>
              <label>Quantity:</label>
              <br>
              <input type="number" placeholder="Quantity..." class="w-full px-2 py-1 bg-ash/10 rounded" required>
            </div>

            <div>
              <label>Unit:</label>
              <br>
              <input type="text" placeholder="Unit..." class="w-full px-2 py-1 bg-ash/10 rounded" required>
            </div>

          </div>

          <div>
            <label>Label:</label>
            <br>
            <input type="text" placeholder="Label..." class="w-full px-2 py-1 bg-ash/10 rounded">
          </div>
        </div>



        <div class="p-2 border-t border-ash/20 flex gap-2">
          <BaseButton button-type="action" class="grow">Add</BaseButton>
          <BaseButton button-type="danger">Cancel</BaseButton>
        </div>

      </form> -->


    </BaseModal>

  </div>
</template>
