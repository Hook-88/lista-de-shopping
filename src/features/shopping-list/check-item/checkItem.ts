import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'

export const useCheckItem = () => {
  const checkItem = useSelectMultipleIds()

  function handleOnToggleCheck(itemId: string) {
    checkItem.toggleSelect(itemId)
  }

  function itemIsChecked(itemId: string) {
    return checkItem.selection.value.some((selectedId) => selectedId === itemId)
  }

  return {
    checkItem,
    handleOnToggleCheck,
    itemIsChecked,
  }
}
