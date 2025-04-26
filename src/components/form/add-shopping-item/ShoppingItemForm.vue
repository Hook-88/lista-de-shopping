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
import { watch } from 'vue';

export type FormDatatype = Omit<ShoppingItemInterface, 'id'>

interface Props {
  item?: ShoppingItemInterface
}

const props = defineProps<Props>()

const { formData, toggleIsFavorite, resetForm } = useAddItemForm()

const emit = defineEmits<{
  (e: 'on-form-submit', newItemData: FormDatatype): void

}>()

watch(
  () => props.item,
  (shoppingItem) => {

    if (shoppingItem) {
      Object.assign(formData, omitId(shoppingItem))
    }
  },
  { immediate: true }
)

function omitId(item: ShoppingItemInterface): FormDatatype {
  const { id, ...rest } = item
  return rest
}

function handleSubmit() {
  emit('on-form-submit', { ...formData })
  resetForm()
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormInputsWrapper>

      <div class="flex">

        <InputLabelWrapper class="grow">
          <TextInput label="Name" placeholder="Item name..." required v-model="formData.name" />
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
