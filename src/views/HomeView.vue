<script setup lang="ts">
import MainNav from '@/components/main-nav/MainNav.vue';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink } from 'vue-router';
import { GROCERIES } from '@/data/data';

</script>

<template>
  <div class="flex flex-col min-h-screen gap-2">
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

    <main class="grow px-2">
      <ul>
        <li v-for="item in GROCERIES" :key="item.id">{{ item.name }}</li>
      </ul>

    </main>

    <footer class="py-2 text-center text-sm">
      &copy; 2025 Hook-88
    </footer>
  </div>
</template>
