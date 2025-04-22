<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <RouterView />
    <footer class="mt-auto py-1 text-center">
      <small>&copy; 2025 - Hook-88 b.v.</small>
    </footer>
  </div>
</template>
