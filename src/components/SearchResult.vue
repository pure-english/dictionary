<template>
  <h2><u><center>Germanic English Alternatives</center></u></h2>


  <h2><u><center>Anglish Alternatives</center></u></h2>
  <div v-for="(words, pos) in anglishEnglishWord" :key="pos">
    <h3 class="mb-5"><center>{{ pos }}</center></h3>
    <v-card
      v-for="(word, index) in words"
      :key="index"
      class="mb-5"
    >
      <v-card-item>
        <v-card-title>
          <router-link :to="`/word/${word.anglish_word}`">
            {{ word.anglish_word }}
            <span v-if="word.anglish_word != word.anglish_spelling &&
            word.anglish_spelling">
              ({{ word.anglish_spelling }})
            </span>
          </router-link>
        </v-card-title>

        <v-card-subtitle>{{ word.taken_from }}</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <p>
          <b>Definitions:</b> {{ word.definitions }}
        </p>

        <p>
          <b>Forebear:</b> {{ word.forebear }}
        </p>

        <p v-if="word.notes">
          <b>Notes:</b> {{ word.notes }}
        </p>
      </v-card-text>
    </v-card>
  </div>

  <h2><u><center>Other Alternatives</center></u></h2>
  <!-- Fuzzy search of Germanic Thesaurus -->
  <!-- Fuzzy search of Anglish Wordbook -->
  <!-- Germanic-like words from GT -->

  <h2><u><center>Anglish Words</center></u></h2>
</template>

<script setup lang="ts">
import { EnglishWord } from "@/types";

defineProps<{
  anglishEnglishWord: EnglishWord,
}>();
</script>

<style scoped>
p {
  padding-bottom: 5px;
}

h2 {
  padding-bottom: 8px;
}
</style>
