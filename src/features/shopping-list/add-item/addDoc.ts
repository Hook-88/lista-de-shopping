import { useFirestore } from 'vuefire'
import { useToast } from 'vue-toast-notification'
import { ref } from 'vue'
import { type FormDatatype } from '@/components/form/add-shopping-item/ShoppingItemForm.vue'
import { addDoc, collection } from 'firebase/firestore'

export const useAddDoc = () => {
  const db = useFirestore()

  const toast = useToast()

  const isLoading = ref(false)
  const addingError = ref<Error | null>(null)

  async function add(formData: FormDatatype) {
    isLoading.value = true
    addingError.value = null

    toast.info(`Adding ${formData.name}`, {
      position: 'top',
      duration: 100000,
      dismissible: false,
    })

    try {
      await addDoc(collection(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items'), formData)
      //clear info when done adding
      toast.clear()

      toast.success(`${formData.name} added to shoping list`, {
        duration: 2000,
        position: 'top',
      })
    } catch (err) {
      // clear info message when error
      toast.clear()

      addingError.value = err as Error

      toast.error(`Someting went wrong... ${addingError.value.message}`, {
        duration: 2000,
        position: 'top',
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    addingError,
    add,
  }
}
