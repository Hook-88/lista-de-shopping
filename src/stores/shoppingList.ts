import type { ShoppingItemInterface } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShoppingListStore = defineStore('shopping-list', () => {
  const items = ref<ShoppingItemInterface[] | null>(null)

  return {
    items,
  }
})
