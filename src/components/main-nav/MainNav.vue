<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faClose, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from 'vue-router';

</script>

<template>
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
</template>
