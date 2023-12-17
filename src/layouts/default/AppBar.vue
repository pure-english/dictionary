<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <a
        href="/dictionary/"
        class="hidden-link"
      >
        Online Anglish Dictionary
      </a>
    </v-app-bar-title>

    <v-responsive max-width="320">
      <v-form
        @submit.prevent="searchWord"
      >
        <v-text-field
          density="compact"
          flat
          hide-details
          label="Search"
          rounded="lg"
          single-line
          variant="solo-filled"
          clearable
          v-model="searchBarValue"
          id="searchBar"
          :autofocus="true"
        ></v-text-field>
      </v-form>
    </v-responsive>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts" setup>
import router from '@/router';
import { onMounted } from 'vue';
import { ref } from 'vue';

let searchBarValue = ref("");

function searchWord() {
  // Go to the word search results
  router.push({ path: "/search", query: { word: searchBarValue.value } });
}

onMounted(() => {
  const searchBar = document.getElementById("searchBar");
  const wordlistSearch = document.getElementById("wordlistSearch");

  window.addEventListener("keyup", (e) => {
    // If the key is pressed and it is not focused
    if (e.code === "KeyS"
      && (document.activeElement !== searchBar)
      && (document.activeElement !== wordlistSearch)) {
      console.log(`Focusing search! activeElement = ${document.activeElement?.id}`);
      searchBar?.focus();
    // Unfocus the search bar if escape is pressed
    } else if (e.code === "Escape" && (document.activeElement === searchBar)) {
      searchBar?.blur();
    } else if (e.code === "Enter" && (document.activeElement === searchBar)) {
      searchBar?.blur();
    }
  });
});
</script>

<style scoped>
hidden-link a {
  color: inherit;
}
</style>
