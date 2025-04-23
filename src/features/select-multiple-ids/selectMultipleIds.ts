import { ref } from 'vue'

export const useSelectMultipleIds = () => {
  const selection = ref<string[]>([])

  function selectId(id: string) {
    selection.value.push(id)
  }

  function deSelectId(id: string) {
    selection.value = selection.value.filter((selectedId) => selectedId !== id)
  }

  function toggleSelect(id: string) {
    if (selection.value.some((selectedId) => selectedId === id)) {
      deSelectId(id)
      return
    }

    selectId(id)
  }

  function clearSelection() {
    selection.value = []
  }

  return {
    selection,

    selectId,
    deSelectId,
    toggleSelect,
    clearSelection,
  }
}
