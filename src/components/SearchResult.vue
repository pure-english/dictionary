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

  <div v-if="true">
    <h2><u><center>Other Results</center></u></h2>
    <!-- Fuzzy search of Germanic Thesaurus -->

    <!-- Fuzzy search of Anglish Wordbook -->
    <div
      v-for="(definitions, word) in anglishFuzzyResults"
      :key="word"
    >
      <!--
        definitions:
        {"Noun":[{"word":"handglass","anglish_spelling":"","definitions":"a
        magnifying <mark>glass</mark>, a hand
        mirror","pos":"Noun","forebear":"hand-glass","taken_from":"NE","notes":"[OED]"}]}
        word: handglass
       -->
      <!-- <h3 class="mb-5"><center>{{ word }}</center></h3> -->
      <hr/><br/>
      <!-- <span>{{ console.log(`definitions: ${JSON.stringify(definitions)}\nword: ${word}`) }}</span> -->
      <div
        v-for="([_, entries], index) in Object.entries(definitions)"
        :key="index"
        class="mb-5"
      >
       <!-- {{ console.log(`index = ${{ pos }}`) }} -->
       <v-card>
        <v-card-item>
          <v-card-title>
            <router-link :to="`/word/${entries[index ?? 0].word}`">
              {{ entries[index].word }}
              <span v-if="entries[index].word != entries[index].anglish_spelling &&
              entries[index].anglish_spelling">
                ({{ entries[index].anglish_spelling }})
              </span>
            </router-link>
          </v-card-title>

          <v-card-subtitle>{{ entries[index].taken_from }}</v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <div
            v-for="(entry, index) in entries"
            :key="index"
          >
            <p>
              <b>Definitions:</b> <span v-html="entry.definitions"></span>
            </p>

            <p>
              <b>Forebear:</b> {{ entry.forebear }}
            </p>

            <p v-if="entry.notes">
              <b>Notes:</b> {{ entry.notes }}
            </p>
          </div>
        </v-card-text>
       </v-card>
      </div>
    </div>

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
        <br/><br/>
        Keep in mind regional spelling differences. The Wordbook uses the
        <a href="https://en.wikipedia.org/wiki/Oxford_spelling">
          Oxford spelling variant of British English</a>. That means using -our words
        like armour and flavour, along with -ize endings like realize and
        utilize (but not -yse endings like analyse).
      </center>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { AnglishToEnglish, AnglishToEnglishEntry, AnglishWord } from "@/types";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated } from "vue";
import { Ref, computed, ref } from "vue";
import { useRoute } from "vue-router";

const store = useAppStore();
const {
  anglishToEnglishDictionary,
  englishToAnglishDictionary,
} = storeToRefs(store);

const props = defineProps<{
  germanicEnglishWord?: false,
  // anglishEnglishWord: EnglishWord,
  searchedWord: string,
}>();

const anglishFuzzyResults: Ref<AnglishToEnglish> = ref({
  "IGNORE_ME": {
    "POS": [{
      word: "",
      anglish_spelling: "",
      definitions: "",
      pos: "",
      forebear: "",
      taken_from: "",
      notes: "",
    }]
  }
});

function refreshSearch() {
  for (const [word, definitions] of Object.entries(anglishToEnglishDictionary.value)) {
    let foundMatch = false;

    for (const [_pos, definition] of Object.entries(definitions)) {
      // console.log(`pos: ${pos}; def: ${JSON.stringify(definition)}`)
      // pos: Proper Noun; def:
      /**
       [{
          "word": "Yuletide",
          "anglish_spelling": "Geƿltide",
          "definitions": "the period of several days around and including Christmas Day",
          "pos": "Proper Noun ",
          "forebear": "Yuletide ",
          "taken_from ": "NE",
          "notes ": "[CED]᛫ Anglisc Spelling based on variant which avoids awkward\ "geool\""
      }]
      */
      for (const subDefinition of definition) {
        if (subDefinition.definitions.includes(props.searchedWord)) {
          subDefinition.definitions = subDefinition.definitions.replaceAll(
            props.searchedWord, `<mark>${props.searchedWord}</mark>`
          )

          foundMatch = true;
        }
      }
    }

    if (foundMatch) {
      anglishFuzzyResults.value[word] = definitions;
    }
  }

  // console.log(`fuzzy length = ${Object.keys(anglishFuzzyResults.value).length}`);

  // if (Object.keys(anglishFuzzyResults.value).length >= 1) {
  delete anglishFuzzyResults.value["IGNORE_ME"];
  // }

  // console.log(`anglishFuzzyResults =\n${JSON.stringify(anglishFuzzyResults.value)}`);
}

onMounted(() => {
  refreshSearch();
});

onUpdated(() => {
  refreshSearch();
});

const route = useRoute();

computed(() => {
  console.log(`route changed to ${route.path}!`);
  return 0;
});
</script>

<style scoped>
p {
  padding-bottom: 5px;
}

h2 {
  padding-bottom: 8px;
}
</style>
