<template>
  <v-app-bar flat>
    <v-app-bar-title>
      Online Anglish Dictionary
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
        ></v-text-field>
      </v-form>
    </v-responsive>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';

let searchBarValue = ref("");

function searchWord() {


  // Go to the word search results
  router.push({ path: "/search", query: { word: searchBarValue.value } });
}
</script>
