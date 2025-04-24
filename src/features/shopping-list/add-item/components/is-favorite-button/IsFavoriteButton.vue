<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import IconStar from '@/components/icons/IconStar.vue';
import type { ButtonHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  isFavorite: boolean
}

defineProps<Props>()

</script>

<template>
  <IconButton type="button">
    <IconStar :variant="isFavorite ? 'solid' : 'regular'" />
  </IconButton>
</template>
