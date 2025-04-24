<script setup lang="ts">
import IconLink from '@/components/links/IconLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';

</script>

<template>
  <PageHeader>
    <IconLink :to="{ name: 'home' }">Back</IconLink>
    <h1>Add new item</h1>
  </PageHeader>
  <main class="p-2">

  </main>
</template>
