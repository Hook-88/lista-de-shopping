import type { ShoppingItemInterface } from '@/types/types'
import { reactive } from 'vue'

type FormDatatype = Omit<ShoppingItemInterface, 'id'>

export const useAddItemForm = () => {
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
    resetForm,
  }
}
