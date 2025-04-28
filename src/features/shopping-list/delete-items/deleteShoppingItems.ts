import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'
import type { ShoppingItemInterface } from '@/types/types'
import { computed, ref, type Ref } from 'vue'
import { useDeleteDocs } from '@/features/firestore/deleteDocs'
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal.vue'

export const useDeleteShoppingItems = (shoppingList: Ref<ShoppingItemInterface[]>) => {
  const idsToDelete = useSelectMultipleIds()
  const { deleteDocs, deletingSuccesful } = useDeleteDocs()

  const itemsTodelete = computed(() => {
    const items = shoppingList.value.filter((shoppingItem) => {
      if (idsToDelete.selection.value.includes(shoppingItem.id)) {
        return shoppingItem
      }
    })

    return items
  })

  const confirmModalRef = ref<InstanceType<typeof ConfirmationModal> | null>(null)

  function removeIdFromDeleteList(itemId: string) {
    idsToDelete.deSelectId(itemId)

    if (idsToDelete.selection.value.length === 0) {
      confirmModalRef.value?.closeModal()
    }
  }

  function deleteCheckedItems(deleteIds: string[]) {
    idsToDelete.setSelection(deleteIds)
    confirmModalRef.value?.openModal()
  }

  async function confirmDeleteItems() {
    await deleteDocs(idsToDelete.selection.value)
    confirmModalRef.value?.closeModal()
  }

  return {
    itemsTodelete,
    idsToDelete,
    deletingSuccesful,

    confirmModalRef,
    removeIdFromDeleteList,
    deleteCheckedItems,
    confirmDeleteItems,
  }
}
