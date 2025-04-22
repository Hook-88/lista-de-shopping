<script setup lang="ts">
import PageHeader from '@/components/page-header/PageHeader.vue';
import { RouterLink } from 'vue-router';

</script>

<template>
  <PageHeader>
    <h1 class="p-2 grow text-center">Page not found...</h1>
  </PageHeader>
  <main class="p-2 text-center">
    <p>
      Oops the page you're looking for is not found. Click <RouterLink class="text-sky-700 underline"
        :to="{ name: 'home' }">here</RouterLink> to go
      to the home page.
    </p>
  </main>
</template>
