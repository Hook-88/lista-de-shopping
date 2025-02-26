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
  name: 'test',
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

        <div>
          <label>Quantity:</label>
          <br>
          <input type="number" placeholder="Quantity..." class="w-full px-2 py-1 bg-ash/10 rounded" required>
        </div>

        <div>
          <label>Unit:</label>
          <br>
          <input type="text" placeholder="Unit..." class="w-full px-2 py-1 bg-ash/10 rounded" required>
        </div>

      </div>

      <div>
        <label>Label:</label>
        <br>
        <input type="text" placeholder="Label..." class="w-full px-2 py-1 bg-ash/10 rounded">
      </div>
    </div>



    <div class="p-2 border-t border-ash/20 flex gap-2">
      <BaseButton button-type="action" class="grow">Add</BaseButton>
      <BaseButton button-type="danger">Cancel</BaseButton>
    </div>

  </form>
</template>
