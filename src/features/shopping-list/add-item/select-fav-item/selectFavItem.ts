import { useSelectSingleId } from '@/features/select-single-id/selectSingleId'
import type { ShoppingItemInterface } from '@/types/types'
import { computed, type Ref } from 'vue'
import type { VueFirestoreQueryData } from 'vuefire'

export const useSelectFavItem = (
  favoriteItems: Ref<VueFirestoreQueryData<ShoppingItemInterface>>,
) => {
  const selectSingleFavItem = useSelectSingleId()

  const selectedFavItem = computed(() => {
    if (!selectSingleFavItem.selection.value) {
      return undefined
    }

    return favoriteItems.value.find((item) => item.id === selectSingleFavItem.selection.value)
  })

  function toggleSelectFavItem(itemId: string) {
    selectSingleFavItem.toggleSelect(itemId)
  }

  function favItemIsSelected(itemId: string) {
    return selectSingleFavItem.selection.value === itemId
  }

  function clearSelection() {
    selectSingleFavItem.clearSelection()
  }

  return {
    selectedFavItem,
    toggleSelectFavItem,
    favItemIsSelected,
    clearSelection,
  }
}
