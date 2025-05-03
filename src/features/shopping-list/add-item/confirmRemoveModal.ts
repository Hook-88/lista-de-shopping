import { ref } from 'vue'
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal.vue'

export const useConfirmRemoveModal = () => {
  const confirmationModalRef = ref<InstanceType<typeof ConfirmationModal> | null>(null)

  function openConfirmModal() {
    confirmationModalRef.value?.openModal()
  }

  function closeConfirmModal() {
    confirmationModalRef.value?.closeModal()
  }

  return {
    confirmationModalRef,
    openConfirmModal,
    closeConfirmModal,
  }
}
