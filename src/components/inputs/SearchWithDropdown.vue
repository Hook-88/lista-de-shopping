<script setup lang="ts">
import { computed } from 'vue';
import InputLabelWrapper from '../form/InputLabelWrapper.vue';
import TextInput from './TextInput.vue';

interface Props {
  label: string
  modelValue?: string | number
  options: string[] | null
  showResults: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleClickResult(labelOption: string) {
  emit('update:modelValue', labelOption)
}

</script>

<template>
  <InputLabelWrapper class="relative">
    <TextInput v-bind="props" :value="modelValue" @input="handleInput" />

    <ul v-if="showResults" class="bg-ash rounded-sm absolute w-full top-15">
      <li class="px-2 py-1" v-for="option in options" :key="option" @click="() => handleClickResult(option)">
        {{ option }}
      </li>
    </ul>

  </InputLabelWrapper>
</template>
