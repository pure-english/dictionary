<template>
  <!-- <h1>Search</h1>
  <p>Searching for '{{ $route.query.word }}'</p> -->
  <v-main class="fill-height bg-grey-lighten-3">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <SearchResult
            :anglishEnglishWord="getAnglishAlternatives($route.query.word?.toString() ?? '')"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import SearchResult from '@/components/SearchResult.vue';
import { EnglishToAnglish, EnglishWord } from '@/types';
import { Ref, ref } from 'vue';

// Empty EnglishToAnglish dict
const englishToAnglishDictionary: Ref<EnglishToAnglish> = ref({
  "english_word": {
    "pos": [{
      anglish_word: "",
      anglish_spelling: "",
      definitions: "",
      forebear: "",
      taken_from: "",
      notes: "",
    }]
  }
});

fetch("/english_to_anglish.json").then((a) => {
  a.json().then((data: EnglishToAnglish) => {
    englishToAnglishDictionary.value = data;
    console.log("Loaded names!");
  })
});

function getAnglishAlternatives(englishWord: string): EnglishWord {
  // console.log(`value = ${JSON.stringify(englishToAnglishDictionary.value)}`);
  return englishToAnglishDictionary.value[englishWord];
}
</script>
