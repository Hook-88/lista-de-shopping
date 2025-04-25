import { useSelectMultipleIds } from '@/features/select-multiple-ids/selectMultipleIds'

export const useCheckItem = () => {
  const checkItem = useSelectMultipleIds()

  function itemIsChecked(itemId: string) {
    return checkItem.selection.value.includes(itemId)
  }

  return {
    checkItem,
    itemIsChecked,
  }
}
