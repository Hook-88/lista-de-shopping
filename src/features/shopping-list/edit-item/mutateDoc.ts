import { ref } from 'vue'
import { updateDoc, type DocumentReference } from 'firebase/firestore'
import type { ShoppingItemInterface } from '@/types/types'

type ItemType = Omit<ShoppingItemInterface, 'id'>

export const useMutateDoc = () => {
  const isUpdating = ref(false)
  const updateSuccesfull = ref(false)
  const updatingError = ref<Error | null>(null)

  async function mutateDoc(docRef: DocumentReference, newItemData: ItemType) {
    isUpdating.value = true
    updatingError.value = null

    try {
      await updateDoc(docRef, newItemData)
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
    mutateDoc,
  }
}
