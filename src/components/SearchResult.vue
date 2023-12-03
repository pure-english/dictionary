<template>
  <div v-if="germanicEnglishWord">
    <h2><u><center>Germanic English Alternatives</center></u></h2>
  </div>

  <div v-if="searchedWord in englishToAnglishDictionary">
    <h2><u><center>Anglish Alternatives</center></u></h2>
    <div v-for="(words, pos) in englishToAnglishDictionary[searchedWord]" :key="pos">
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
  </div>

  <div v-if="searchedWord in anglishToEnglishDictionary">
    <h2><u><center>Anglish Words</center></u></h2>

    <div v-for="(words, pos) in anglishToEnglishDictionary[searchedWord]" :key="pos">
      <h3 class="mb-5"><center>{{ pos }}</center></h3>
      <v-card
        v-for="(word, index) in words"
        :key="index"
        class="mb-5"
      >
        <v-card-item>
          <v-card-title>
            <router-link :to="`/word/${word.word}`">
              {{ word.word }}
              <span v-if="word.word != word.anglish_spelling &&
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
  </div>

  <div v-if="false">
    <h2><u><center>Other Results</center></u></h2>
    <!-- Fuzzy search of Germanic Thesaurus -->
    <!-- Fuzzy search of Anglish Wordbook -->
    <!-- Germanic-like words from GT -->
  </div>

  <div v-if="!germanicEnglishWord &&
  !(searchedWord in englishToAnglishDictionary) &&
  !(searchedWord in anglishToEnglishDictionary) &&
  'changeMeToOppositeOfOtherResults'">
    <h2><center>No results found!</center></h2>
    <p>
      <center>
        We're sorry, but '{{ searchedWord }}' could not be found.
        <br/><br/>
        Try to search using only a lemma/the dictionary form of words.
        <br/><br/>
        E.g. instead of "bears", try "bear".
        Instead of "broke" try "break".
      </center>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

const store = useAppStore();
const {
  anglishToEnglishDictionary,
  englishToAnglishDictionary,
} = storeToRefs(store);

defineProps<{
  germanicEnglishWord?: false,
  // anglishEnglishWord: EnglishWord,
  searchedWord: string,
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
