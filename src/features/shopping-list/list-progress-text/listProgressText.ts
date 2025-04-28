import { computed } from 'vue'

export const useListProgressText = (listProgressObj: {
  numOfCheckedItems: number
  numOfShoppingItems: number
}) => {
  const text = computed(() => {
    return listProgressObj.numOfCheckedItems === listProgressObj.numOfShoppingItems
      ? `(${listProgressObj.numOfCheckedItems}/${listProgressObj.numOfShoppingItems}) - Completed`
      : `(${listProgressObj.numOfCheckedItems}/${listProgressObj.numOfShoppingItems})`
  })

  return {
    text,
  }
}
