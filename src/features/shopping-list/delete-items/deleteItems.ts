import { computed, ref, type Ref } from 'vue'
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'
import BaseModal from '@/components/modal/BaseModal.vue'
import type { ShoppingItemInterface } from '@/types/types'
import { writeBatch } from 'firebase/firestore'
import { useToast } from 'vue-toast-notification'
import { useFirestore } from 'vuefire'
import { doc } from 'firebase/firestore'

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

  //delete docs
  const deleting = ref(false)
  const deletingError = ref<Error | null>(null)
  const toast = useToast()
  const db = useFirestore()

  async function deleteDocs() {
    const batch = writeBatch(db)

    deleting.value = true
    deletingError.value = null

    toast.info('Deleting items', {
      position: 'top',
      duration: 10000,
      dismissible: false,
    })

    try {
      idsToDelete.selection.value.forEach((id) => {
        const docRef = doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', id)
        batch.delete(docRef)
      })

      await batch.commit()

      toast.clear()

      toast.success('Items deleted', {
        position: 'top',
        duration: 2000,
      })

      confirmModalRef.value?.closeModal()
      idsToDelete.clearSelection()
    } catch (error) {
      deletingError.value = error as Error

      toast.clear()

      toast.error(`Deleting faild. Error: ${deletingError.value.message}`, {
        position: 'top',
        duration: 3000,
      })
    } finally {
      deleting.value = false
    }
  }

  //delete docs

  return {
    idsToDelete,
    confirmModalRef,
    itemsTodelete,
    handleOnRemoveFromList,

    deleteDocs,
    deleting,
    deletingError,
  }
}
