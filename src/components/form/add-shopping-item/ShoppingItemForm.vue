<script setup lang="ts">
import FormInputsWrapper from '../FormInputsWrapper.vue';
import InputLabelWrapper from '../InputLabelWrapper.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import IsFavoriteButton from '@/features/shopping-list/add-item/components/is-favorite-button/IsFavoriteButton.vue';
import NumberInput from '@/components/inputs/NumberInput.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import { useAddItemForm } from '@/features/shopping-list/add-item/addItemForm';
import type { ShoppingItemInterface } from '@/types/types';
import ButtonLink from '@/components/links/ButtonLink.vue';
import { onMounted, ref, watch } from 'vue';
import { useDocument, useFirestore } from 'vuefire';
import { doc, getDoc } from 'firebase/firestore';

export type FormDatatype = Omit<ShoppingItemInterface, 'id'>

interface Props {
  itemId?: string
}

const db = useFirestore()

const props = defineProps<Props>()

const { formData, toggleIsFavorite, resetForm } = useAddItemForm()

const emit = defineEmits<{
  (e: 'on-form-submit', newItemData: FormDatatype): void
}>()

const nameInputRef = ref<InstanceType<typeof TextInput> | null>(null)

function handleSubmit() {
  if (props.itemId) {
    // add submit if item id is true

    return
  }


  emit('on-form-submit', { ...formData })
  resetForm()
  nameInputRef.value?.focusInput()
}

onMounted(() => {
  nameInputRef.value?.focusInput()
})

async function getShoppingItem() {
  const docRef = doc(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items', props.itemId as string)
  const itemDoc = await getDoc(docRef)
  const itemData = { ...itemDoc.data(), id: itemDoc.id } as ShoppingItemInterface

  formData.name = itemData.name
  formData.isFavorite = itemData.isFavorite
  formData.quantity = itemData.quantity
  formData.unit = itemData.unit
  formData.label = itemData.label
}




watch(
  () => props.itemId,
  (itemId: string | undefined) => {

    if (itemId) {

      getShoppingItem()

    }
  },
  {
    immediate: true
  }
)

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormInputsWrapper>

      <div class="flex">

        <InputLabelWrapper class="grow">
          <TextInput label="Name" placeholder="Item name..." required v-model="formData.name" ref="nameInputRef" />
        </InputLabelWrapper>

        <IsFavoriteButton :is-favorite="formData.isFavorite" class="self-stretch flex text-2xl mb-0.5 items-end pr-0"
          @click="toggleIsFavorite" />

      </div>

      <div class="flex gap-2">

        <InputLabelWrapper class="w-20">
          <NumberInput label="Quantity" required v-model="formData.quantity" />
        </InputLabelWrapper>

        <InputLabelWrapper class="grow">
          <TextInput label="Unit" placeholder="Item unit..." class="w-full" required v-model="formData.unit" />
        </InputLabelWrapper>

      </div>

      <InputLabelWrapper class="grow">
        <TextInput label="Label" placeholder="Item label..." class="w-full" required v-model="formData.label" />
      </InputLabelWrapper>

    </FormInputsWrapper>

    <footer class="p-2 border-y border-ivory/20 flex gap-2">
      <BaseButton variant="action" class="grow">Add item</BaseButton>
      <ButtonLink variant="danger" :to="{ name: 'home' }">Cancel</ButtonLink>
    </footer>

  </form>
</template>
