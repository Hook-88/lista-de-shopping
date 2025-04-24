import { computed, ref } from 'vue'
import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'
import BaseModal from '@/components/modal/BaseModal.vue'
import type { ShoppingItemInterface } from '@/types/types'

export const useDeleteItems = (checkedItems: ShoppingItemInterface[]) => {
  const idsToDelete = useSelectMultipleIds()

  const confirmModalRef = ref<InstanceType<typeof BaseModal> | null>(null)

  function handleClickDeleteCheckedItems() {
    idsToDelete.setSelection(checkedItems.map((checkedItem) => checkedItem.id))
    confirmModalRef.value?.openModal()
  }

  const itemsTodelete = computed(() => {
    return checkedItems.filter((checkedItem) => {
      if (idsToDelete.selection.value.includes(checkedItem.id)) {
        return checkedItem
      }
    })
  })

  return {
    idsToDelete,
    confirmModalRef,
    itemsTodelete,
    handleClickDeleteCheckedItems,
  }
}
