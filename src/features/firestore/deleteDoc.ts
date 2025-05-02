import { deleteDoc, doc } from 'firebase/firestore'
import { ref } from 'vue'
import { useDocument, useFirestore } from 'vuefire'

const db = useFirestore()

export const useDeleteDoc = (path: string) => {
  const deleting = ref(false)
  const deletingSucces = ref(false)
  const deletingError = ref<Error | null>(null)

  async function deleteDocument(docId: string) {
    deleting.value = true
    deletingSucces.value = false
    deletingError.value = null

    try {
      const docRef = doc(db, path, docId)
      await deleteDoc(docRef)

      deletingSucces.value = true
    } catch (error) {
      deletingError.value = error as Error
    } finally {
      deleting.value = false
    }
  }

  return {
    deleting,
    deletingSucces,
    deletingError,

    deleteDocument,
  }
}
