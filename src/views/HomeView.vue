<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <div class="flex flex-col min-h-screen">

    <header>
      <button>
        La Lista
      </button>
      <button>
        <FontAwesomeIcon :icon="fa" />
      </button>
    </header>

    <main class="grow">
      <h1 class="text-xl">this is home</h1>
    </main>

    <footer>here the footer</footer>
  </div>
</template>
