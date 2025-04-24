import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'
import type { ShoppingItemInterface } from '@/types/types'
import { computed, type Ref } from 'vue'

export const useCheckItem = (shoppingList: Ref<ShoppingItemInterface[]>) => {
  const checkItem = useSelectMultipleIds()

  function handleOnToggleCheck(itemId: string) {
    checkItem.toggleSelect(itemId)
  }

  function itemIsChecked(itemId: string) {
    return checkItem.selection.value.includes(itemId)
  }

  const checkedItems = computed(() => {
    return shoppingList.value.filter((shoppingItem) => {
      if (checkItem.selection.value.some((checkedId) => checkedId === shoppingItem.id)) {
        return shoppingItem
      }
    })
  })

  return {
    checkItem,
    checkedItems,
    handleOnToggleCheck,
    itemIsChecked,
  }
}
