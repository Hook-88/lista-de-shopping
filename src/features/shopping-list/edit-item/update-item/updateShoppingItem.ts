import { ref } from 'vue'
import { updateDoc } from 'firebase/firestore'
import type { DocumentReference } from 'firebase/firestore'
import type { ShoppingItemInterface } from '@/types/types'

type shoppingItemNoIdType = Omit<ShoppingItemInterface, 'id'>

export const useUpdateShoppingItem = () => {
  const isUpdating = ref(false)
  const updateSuccesfull = ref(false)
  const updatingError = ref<Error | null>(null)

  async function updateShoppingItem(docRef: DocumentReference, itemData: shoppingItemNoIdType) {
    isUpdating.value = true
    updateSuccesfull.value = false
    updatingError.value = null

    try {
      await updateDoc(docRef, itemData)

      updateSuccesfull.value = true
    } catch (error) {
      updatingError.value = error as Error
    } finally {
      isUpdating.value = false
    }
  }

  return {
    isUpdating,
    updateSuccesfull,
    updatingError,

    updateShoppingItem,
  }
}
