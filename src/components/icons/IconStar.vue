<script setup lang="ts">
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Props {
  variant?: 'regular' | 'solid'
}

defineProps<Props>()

</script>

<template>
  <FontAwesomeIcon :icon="variant === 'solid' ? faStarSolid : faStar" :class="{
    'text-amber-300': variant === 'solid'
  }" />
</template>
