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
  // variant: 'add-item' | 'update-item'
  item?: ShoppingItemInterface
  submitButtonDisabled?: boolean
  labelOptions: string[] | null
}

const props = defineProps<Props>()

const { formData, resetForm } = useAddItemForm()

function toggleIsFavorite() {

  if (!props.item?.id) {
    formData.isFavorite = !formData.isFavorite
  }

  emit('on-toggle-favorite', {
    favValue: formData.isFavorite,
    itemId: props.item?.id
  })
}

const emit = defineEmits<{
  (e: 'on-toggle-favorite', favItemObj: {
    itemId: string | undefined
    favValue: boolean
  }): void

  (e: 'on-form-submit', newItemData: FormDatatype, itemId: string | undefined): void
  (e: 'on-update-item', itemId: string, newItemData: FormDatatype): void
}>()

const nameInputRef = ref<InstanceType<typeof TextInput> | null>(null)

const filteredLabelOptions = computed(() => {
  if (props.labelOptions) {

    return props.labelOptions.filter(labelOption => {
      const lowerCaseOption = labelOption.toLowerCase()

      if (lowerCaseOption.includes(formData.label.toLowerCase())) {

        return labelOption
      }
    })
  }

  return props.labelOptions
})

const showLabelSearchResults = computed(() => {
  if (!filteredLabelOptions.value) {
    return false
  }

  if (filteredLabelOptions.value[0] === formData.label || filteredLabelOptions.value.length === 0) {
    return false
  }

  return true
})


function handleSubmit() {
  trimFormData()

  emit('on-form-submit', { ...formData }, props.item?.id)
  resetForm()
  nameInputRef.value?.focusInput()
}

function trimFormData() {
  formData.label = formData.label.trim()
  formData.name = formData.name.trim()
  formData.unit = formData.unit.trim().toLowerCase()
}

// onMounted(() => {
//   nameInputRef.value?.focusInput()
// })

watch(
  () => props.item,
  (item: ShoppingItemInterface | undefined) => {

    if (item) {
      console.log(item)
      formData.name = item.name
      formData.quantity = item.quantity
      formData.isFavorite = item.isFavorite
      formData.unit = item.unit
      formData.label = item.label
    } else {
      formData.name = ''
      formData.quantity = 1
      formData.isFavorite = false
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

    <footer class=" px-4 flex gap-4 border-b border-ivory/20 pb-4">
      <BaseButton variant="action" class="grow disabled:text-ivory/50 disabled:bg-sky-900"
        :disabled="submitButtonDisabled">
        Add
      </BaseButton>
      <ButtonLink variant="danger" :to="{ name: 'home' }">Cancel</ButtonLink>
    </footer>

  </form>
</template>
