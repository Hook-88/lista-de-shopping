import type { ShoppingItemInterface } from '@/types/types'
import { reactive } from 'vue'

type FormDatatype = Omit<ShoppingItemInterface, 'id'>

export const useAddItemForm = () => {
  function toggleIsFavorite() {
    formData.isFavorite = !formData.isFavorite
    console.log(formData.isFavorite)
  }

  const formData = reactive<FormDatatype>({
    isFavorite: false,
    label: 'General',
    name: '',
    quantity: 1,
    unit: 'pieces',
  })

  function resetForm() {
    formData.isFavorite = false
    formData.name = ''
    formData.quantity = 1
  }

  return {
    formData,
    toggleIsFavorite,
    resetForm,
  }
}
