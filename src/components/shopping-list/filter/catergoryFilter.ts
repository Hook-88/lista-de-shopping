import { useShoppingListStore } from '@/stores/shoppingList'
import { useSelectSingleId } from '@/features/select-single-id/selectSingleId'
import { computed } from 'vue'

export const useCategoryFilter = () => {
  const shoppingListStore = useShoppingListStore()
  const selectCategory = useSelectSingleId()

  const itemCategories = computed(() => {
    if (!shoppingListStore.items) {
      return
    }

    const allLabels = shoppingListStore.items.map((item) => item.label)

    return [...new Set(allLabels)]
  })

  return {
    selectCategory,
    itemCategories,
  }
}
