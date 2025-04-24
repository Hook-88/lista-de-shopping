import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'

export const useCheckItem = () => {
  const checkItem = useSelectMultipleIds()

  function handleOnToggleCheck(itemId: string) {
    checkItem.toggleSelect(itemId)
  }

  function itemIsChecked(itemId: string) {
    return checkItem.selection.value.includes(itemId)
  }

  return {
    checkItem,
    handleOnToggleCheck,
    itemIsChecked,
  }
}
