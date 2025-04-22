<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import MainNav from '@/components/main-nav/MainNav.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { faAngleRight, faCaretDown, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouterLink } from 'vue-router';

</script>

<template>
  <PageHeader>
    <IconButton popovertarget="main-nav">
      Lista
      <IconCaretDown />
    </IconButton>

    <MainNav title="Lista">

      <RouterLink to="/" class="px-2 py-1 ml-auto flex items-center justify-between w-full border-b border-ivory/20">
        Recipes
        <FontAwesomeIcon :icon="faAngleRight" />
      </RouterLink>

      <RouterLink to="/" class="px-2 py-1 ml-auto flex items-center justify-between w-full border-b border-ivory/20">
        About
        <FontAwesomeIcon :icon="faAngleRight" />
      </RouterLink>

    </MainNav>

    <RouterLink to="/" class="px-2 py-1 ml-auto">
      <FontAwesomeIcon :icon="faPlus" />
    </RouterLink>

  </PageHeader>
  <main>
    <h1 class="text-xl">This is home</h1>
  </main>
</template>
