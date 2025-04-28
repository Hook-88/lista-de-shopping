import { doc, writeBatch } from 'firebase/firestore'
import { ref } from 'vue'
import { useFirestore } from 'vuefire'

export const useDeleteDocs = () => {
  const db = useFirestore()

  const isDeleting = ref(false)
  const deletingError = ref<Error | null>(null)
  const deletingSuccesful = ref(false)

  async function deleteDocs(ids: string[]) {
    isDeleting.value = true
    deletingError.value = null

    try {
      const batch = writeBatch(db)
      ids.forEach((id) => {
        const docRef = doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', id)
        batch.delete(docRef)
      })

      await batch.commit()

      deletingSuccesful.value = true
    } catch (error) {
      deletingError.value = error as Error
    } finally {
      isDeleting.value = false
    }
  }

  return {
    isDeleting,
    deletingError,
    deletingSuccesful,
    deleteDocs,
  }
}
