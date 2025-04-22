<script setup lang="ts">
import { faCircle } from '@fortawesome/free-regular-svg-icons/faCircle';
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons/faCircle';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';

interface Props {
  isSolid?: boolean
}

const props = defineProps<Props>()

const circleIcon = computed(() => {
  return props.isSolid ? faCircleSolid : faCircle
})

</script>

<template>
  <FontAwesomeIcon :icon="circleIcon" />
</template>
