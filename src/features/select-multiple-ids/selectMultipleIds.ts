import { ref } from 'vue'

export const useSelectMultipleIds = () => {
  const selectedIds = ref<string[]>([])

  function selectId(itemId: string) {
    selectedIds.value.push(itemId)
  }

  function deselectId(itemId: string) {
    selectedIds.value = selectedIds.value.filter((id) => id !== itemId)
  }

  function toggleSelectId(itemId: string) {
    if (selectedIds.value.includes(itemId)) {
      deselectId(itemId)
      return
    }

    selectId(itemId)
  }

  function clearSelection() {
    selectedIds.value = []
  }

  return {
    selectedIds,
    selectId,
    deselectId,
    toggleSelectId,
    clearSelection,
  }
}
