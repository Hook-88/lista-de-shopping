import type { ShoppingItemInterface } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShoppingListStore = defineStore('shopping-list', () => {
  const items = ref<ShoppingItemInterface[] | null>(null)

  function deleteSelectedItems(selectedIds: string[]) {
    if (!items.value) {
      throw new Error('Items is null, noting to delete...')
    }

    items.value = items.value.filter((item) => {
      if (!selectedIds.includes(item.id)) {
        return item
      }
    })
  }

  return {
    items,
    deleteSelectedItems,
  }
})
