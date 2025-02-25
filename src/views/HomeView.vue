<script setup lang="ts">
import MainNav from '@/components/main-nav/MainNav.vue';
import { faAngleRight, faCaretDown, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="text-xl flex justify-between items-center border-b border-ash/20">

      <button class="p-2 flex items-center gap-2" popovertarget="main-nav">
        La Lista
        <FontAwesomeIcon :icon="faCaretDown" />
      </button>
      <MainNav />

      <button class="p-2">
        <FontAwesomeIcon :icon="faPlus" />
      </button>

    </header>

    <main class="grow">
      <h1 class="text-xl">this is home</h1>
    </main>

    <footer>here the footer</footer>
  </div>
</template>
