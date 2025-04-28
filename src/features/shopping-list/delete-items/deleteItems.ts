import { computed, type Ref } from 'vue'
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'
import type { ShoppingItemInterface } from '@/types/types'
import { useFirestore } from 'vuefire'
import { doc, writeBatch } from 'firebase/firestore'

export const useDeleteItems = (shoppingList: Ref<ShoppingItemInterface[]>) => {
  const idsToDelete = useSelectMultipleIds()
  const db = useFirestore()

  const itemsTodelete = computed(() => {
    const items = shoppingList.value.filter((shoppingItem) => {
      if (idsToDelete.selection.value.includes(shoppingItem.id)) {
        return shoppingItem
      }
    })

    return items
  })

  // Delete Docs //
  async function deleteDocs(ids: string[]) {
    const batch = writeBatch(db)

    ids.forEach((id) => {
      const docRef = doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', id)
      batch.delete(docRef)
    })

    await batch.commit()
  }

  return {
    idsToDelete,
    itemsTodelete,

    deleteDocs,
  }
}
