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
import { computed, onMounted, ref, watch } from 'vue';
import SearchWithDropdown from '@/components/inputs/SearchWithDropdown.vue';

export type FormDatatype = Omit<ShoppingItemInterface, 'id'>

interface Props {
  item?: ShoppingItemInterface
  submitButtonDisabled?: boolean
  labelOptions: string[] | null
}

const props = defineProps<Props>()

const { formData, toggleIsFavorite, resetForm } = useAddItemForm()

const emit = defineEmits<{
  (e: 'on-form-submit', newItemData: FormDatatype): void
  (e: 'on-update-item', itemId: string, newItemData: FormDatatype): void
}>()

const nameInputRef = ref<InstanceType<typeof TextInput> | null>(null)

const filteredLabelOptions = computed(() => {
  if (props.labelOptions) {

    return [...props.labelOptions.filter(labelOption => {
      const lowerCaseOption = labelOption.toLowerCase()

      if (lowerCaseOption.includes(formData.label.toLowerCase())) {

        return labelOption
      }

    }), 'General']
  }

  return props.labelOptions
})

const showLabelSearchResults = computed(() => {
  if (!filteredLabelOptions.value) {
    return false
  }

  if (filteredLabelOptions.value[0] === formData.label) {
    return false
  }

  return true
})


function handleSubmit() {
  trimFormData()

  if (props.item) {
    emit('on-update-item', props.item.id, { ...formData })
    return
  }

  emit('on-form-submit', { ...formData })
  resetForm()
  nameInputRef.value?.focusInput()
}

function trimFormData() {
  formData.label = formData.label.trim()
  formData.name = formData.name.trim()
  formData.unit = formData.unit.trim().toLowerCase()
}

onMounted(() => {
  nameInputRef.value?.focusInput()
})

function setForm() {


  if (props.item) {
    const {
      name,
      quantity,
      unit,
      label,
      isFavorite,
    } = props.item

    formData.name = name
    formData.isFavorite = isFavorite
    formData.quantity = quantity
    formData.unit = unit
    formData.label = label
  }
}

watch(
  () => props.item,
  (shoppingItem: ShoppingItemInterface | undefined) => {

    if (shoppingItem) {
      setForm()

    } else {
      formData.name = ''
      formData.isFavorite = false
      formData.quantity = 1
      formData.unit = 'pieces'
      formData.label = 'General'
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
      <SearchWithDropdown label="Label" class="w-full" required v-model="formData.label" :options="filteredLabelOptions"
        :show-results="showLabelSearchResults" />

    </FormInputsWrapper>

    <footer class="p-2 border-y border-ivory/20 flex gap-2">
      <BaseButton variant="action" class="grow disabled:text-ivory/50 disabled:bg-sky-900"
        :disabled="submitButtonDisabled">
        {{ props.item ? 'Save' : 'Add' }}
      </BaseButton>
      <ButtonLink variant="danger" :to="{ name: 'home' }">Cancel</ButtonLink>
    </footer>

  </form>
</template>
