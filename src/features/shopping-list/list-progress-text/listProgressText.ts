import { computed, type Ref } from 'vue'

export const useListProgressText = (listProgressObj: {
  numOfCheckedItems: Ref<number>
  numOfShoppingItems: Ref<number>
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
