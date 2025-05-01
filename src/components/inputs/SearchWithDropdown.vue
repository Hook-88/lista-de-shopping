<script setup lang="ts">
import InputLabelWrapper from '../form/InputLabelWrapper.vue';
import TextInput from './TextInput.vue';
// import IconButton from '../buttons/IconButton.vue';
// import IconCaretDown from '../icons/IconCaretDown.vue';

interface Props {
  label: string
  modelValue?: string | number
  options: string[] | null
  showResults: boolean

  autofocus?: boolean
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

    <!-- <IconButton class="absolute right-0 top-5 text-2xl" type="button" @click="toggleOpenResults">
      <IconCaretDown />
    </IconButton> -->

    <ul v-if="showResults" class="bg-ash rounded-sm absolute w-full top-15 z-40 border border-ivory/40">
      <li class="px-2 py-1" v-for="option in options" :key="option" @click="() => handleClickResult(option)">
        {{ option }}
      </li>
    </ul>

  </InputLabelWrapper>
</template>
