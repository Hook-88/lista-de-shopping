<script setup lang="ts">
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseButton from '@/components/buttons/BaseButton.vue';
import { reactive } from 'vue';

interface FormDataInterface {
  name: string
  quantity: number
  unit: string
  label: string
}

const formData = reactive<FormDataInterface>({
  name: '',
  quantity: 1,
  unit: 'Pieces',
  label: ''
})


</script>

<template>
  <form>
    <div class="p-2 flex flex-col gap-2 pb-3">

      <BaseInput label="Name" v-model="formData.name" />

      <div class="flex gap-2">

        <BaseInput label="Quantity" type="number" v-model="formData.quantity" />

        <BaseInput label="Unit" v-model="formData.unit" />

      </div>

      <BaseInput label="Label" v-model="formData.unit" />
    </div>



    <div class="p-2 border-t border-ash/20 flex gap-2">
      <BaseButton button-type="action" class="grow">Add</BaseButton>
      <BaseButton button-type="danger" type="button">Cancel</BaseButton>
    </div>

  </form>
</template>
