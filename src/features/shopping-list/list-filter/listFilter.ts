import { useSelectSingleId } from '@/features/select-single-id/selectSingleId'

export const useListFilter = () => {
  const selectFilter = useSelectSingleId()

  function handleOnSelectLabel(label: string) {
    selectFilter.selectId(label)
  }

  function handleOnClearFilter() {
    selectFilter.clearSelection()
  }

  return {
    selectFilter,
    handleOnSelectLabel,
    handleOnClearFilter,
  }
}
