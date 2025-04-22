<script setup lang="ts">
import IconButton from '@/components/buttons/IconButton.vue';
import IconAngleRight from '@/components/icons/IconAngleRight.vue';
import IconCaretDown from '@/components/icons/IconCaretDown.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconLink from '@/components/links/IconLink.vue';
import MainNav from '@/components/main-nav/MainNav.vue';
import MainNavLink from '@/components/main-nav/MainNavLink.vue';
import PageHeader from '@/components/page-header/PageHeader.vue';
import { db } from '@/firebase/firebase';
import type { ShoppingItemInterface } from '@/types/types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { collection } from 'firebase/firestore';
import { RouterLink } from 'vue-router';
import { useCollection, useFirestore } from 'vuefire';

const {
  data: shoppingList,
  pending: shoppingListLoading,
  error: shoppingListError
} = useCollection<ShoppingItemInterface>(collection(db, '/shopping-list/sesNgDGMJVKvzIki6ru3/shopping-items'))

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
    <div v-if="shoppingListLoading">
      Loading...
    </div>
    <ul>
      <li v-for="item in shoppingList" :key="item.id">{{ item.name }}</li>
    </ul>

  </main>
</template>
