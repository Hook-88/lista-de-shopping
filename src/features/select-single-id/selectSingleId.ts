import { ref } from 'vue'

export const useSelectSingleId = () => {
  const selection = ref<string | null>(null)

  function selectId(id: string) {
    selection.value = id
  }

  function clearSelection() {
    selection.value = null
  }

  function toggleSelect(id: string) {
    if (selection.value === id) {
      clearSelection()
      return
    }

    selectId(id)
  }

  return {
    selection,
    selectId,
    clearSelection,
    toggleSelect,
  }
}
