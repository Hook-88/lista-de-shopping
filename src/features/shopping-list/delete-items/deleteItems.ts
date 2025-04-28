import { computed, type Ref } from 'vue'
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'
import type { ShoppingItemInterface } from '@/types/types'

export const useDeleteItems = (shoppingList: Ref<ShoppingItemInterface[]>) => {
  const idsToDelete = useSelectMultipleIds()

  const itemsTodelete = computed(() => {
    const items = shoppingList.value.filter((shoppingItem) => {
      if (idsToDelete.selection.value.includes(shoppingItem.id)) {
        return shoppingItem
      }
    })

    return items
  })

  return {
    idsToDelete,
    itemsTodelete,
  }
}
