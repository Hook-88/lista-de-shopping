<script setup lang="ts">
import { faAngleRight, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="text-xl">
      <button class="p-2" popovertarget="main-nav">La Lista</button>

      <nav popover id="main-nav" class="open:flex flex-col min-w-screen bg-sky-950 text-ash backdrop:backdrop-blur-sm">

        <button class="p-2 flex justify-between items-center border-b border-ash/20" popovertarget="main-nav">
          La Lista
          <FontAwesomeIcon :icon="faClose" />
        </button>

        <RouterLink to="/recipes" class="p-2 flex justify-between items-center border-b border-ash/20">
          Recipes
          <FontAwesomeIcon :icon="faAngleRight" />
        </RouterLink>

        <RouterLink :to="{
          name: 'about'
        }" class="p-2 flex justify-between items-center border-b border-ash/20">

          About
          <FontAwesomeIcon :icon="faAngleRight" />
        </RouterLink>
      </nav>

      <button>
        <FontAwesomeIcon :icon="faPlus" />
      </button>
    </header>

    <main class="grow">
      <h1 class="text-xl">this is home</h1>
    </main>

    <footer>here the footer</footer>
  </div>
</template>
