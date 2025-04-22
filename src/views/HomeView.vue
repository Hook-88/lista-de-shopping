<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import IconAngleRight from '@/components/icons/IconAngleRight.vue';
import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconLink from '@/components/links/IconLink.vue';
import MainNav from '@/components/main-nav/MainNav.vue';
import MainNavLink from '@/components/main-nav/MainNavLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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

      <MainNavLink to="/recipes">
        Recipes
      </MainNavLink>

      <MainNavLink :to="{ name: 'about' }">
        About
      </MainNavLink>

    </MainNav>

    <IconLink to="/" class="ml-auto">
      <IconPlus />
    </IconLink>

  </PageHeader>
  <main class="p-2">

  </main>
</template>
