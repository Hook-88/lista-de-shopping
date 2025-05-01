<script setup lang="ts">
import FilterButton from '@/components/buttons/FilterButton.vue';

interface Props {
  selectedLabel: string | null
  listLabels: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-clear-filter'): void
  (e: 'on-select-label', label: string): void
}>()

function labelIsSelected(label: string) {
  return props.selectedLabel === label
}

function handleClickAllLabels() {
  emit('on-clear-filter')
}

function handleClickListFilter(label: string) {
  emit('on-select-label', label)
}

</script>


<template>
  <ul class="flex gap-2 mb-1 flex-wrap">
    <li>
      <FilterButton :is-selected="!selectedLabel" @click="handleClickAllLabels">
        All
      </FilterButton>
    </li>
    <li v-for="(label, index) in listLabels" :key="index">
      <FilterButton :is-selected="labelIsSelected(label)" @click="() => handleClickListFilter(label)">
        {{ label }}
      </FilterButton>
    </li>
  </ul>
</template>
