import { ref } from 'vue'

export const useSelectSingleId = () => {
  const selectedId = ref<string | null>(null)

  function selectId(itemId: string) {
    selectedId.value = itemId
  }

  function toggleSelectId(itemId: string) {
    if (selectedId.value === itemId) {
      clearSelection()
      return
    }

    selectId(itemId)
  }

  function clearSelection() {
    selectedId.value = null
  }

  return {
    selectedId,
    selectId,
    toggleSelectId,
    clearSelection,
  }
}
