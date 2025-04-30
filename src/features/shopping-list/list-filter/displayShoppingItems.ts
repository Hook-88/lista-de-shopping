import type { ShoppingItemInterface } from '@/types/types'
import type { Ref } from 'vue'
import { computed } from 'vue'

export const useDisplayShoppingItems = (
  filter: Ref<string | null>,
  shoppingList: Ref<ShoppingItemInterface[]>,
) => {
  const displayItems = computed(() => {
    if (filter.value) {
      return shoppingList.value.filter((shoppingItem) => shoppingItem.label === filter.value)
    }

    return shoppingList.value
  })

  return {
    displayItems,
  }
}
