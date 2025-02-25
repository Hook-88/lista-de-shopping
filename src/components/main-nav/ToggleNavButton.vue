<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <button class="p-2 flex items-center gap-2" popovertarget="main-nav">
    <slot></slot>
    <FontAwesomeIcon :icon="faCaretDown" />
  </button>
</template>
