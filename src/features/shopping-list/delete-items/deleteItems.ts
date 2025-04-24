import { computed, ref, type Ref } from 'vue'
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'
import BaseModal from '@/components/modal/BaseModal.vue'
import type { ShoppingItemInterface } from '@/types/types'

export const useDeleteItems = (shoppingList: Ref<ShoppingItemInterface[]>) => {
  // Delete items //
  const idsToDelete = useSelectMultipleIds()

  const confirmModalRef = ref<InstanceType<typeof BaseModal> | null>(null)

  const itemsTodelete = computed(() => {
    const items = shoppingList.value.filter((shoppingItem) => {
      if (idsToDelete.selection.value.includes(shoppingItem.id)) {
        return shoppingItem
      }
    })

    return items
  })
  // Delete items

  // Remove item from delete list //
  function handleOnRemoveFromList(itemId: string) {
    idsToDelete.deSelectId(itemId)

    if (idsToDelete.selection.value.length === 0) {
      confirmModalRef.value?.closeModal()
    }
  }

  return {
    idsToDelete,
    confirmModalRef,
    itemsTodelete,
    handleOnRemoveFromList,
  }
}
