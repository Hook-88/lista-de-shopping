<script setup lang="ts">
import PageHeader from '../PageHeader.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import MainNav from '@/components/main-nav/MainNav.vue';
import MainNavLink from '@/components/main-nav/MainNavLink.vue';
import IconLink from '@/components/links/IconLink.vue';
import IconPlus from '@/components/icons/IconPlus.vue';

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
</template>
