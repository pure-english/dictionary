<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div
    v-if="searchedWord in englishToGermanicDictionary"
    class="mb-8"
  >
    <h2><u><center>Germanic English Alternatives</center></u></h2>

    <div
      v-for="(words, pos) in englishToGermanicDictionary[searchedWord]"
      :key="pos"
    >
      <h3 class="mb-5"><center>{{ pos }}</center></h3>
      <v-card v-for="(word, index) in words" :key="index" class="mb-5">
        <v-card-item>
          <v-card-title>
            {{ searchedWord }}
          </v-card-title>
        </v-card-item>

        <v-card-text>
          <!-- {{ word }} -->

          <div v-if="word.alternatives">
            <p><b>Alternatives:</b></p>

            <p>{{ word.alternatives }}</p>
          </div>

          <p v-if="word.germanic_like_alternatives">
            <b>Germanic-like Alternatives:</b>
            {{ word.germanic_like_alternatives }}
          </p>

          <div v-if="word.details">
            <p><b>Details:</b></p>

            <p v-html="word.details"></p>
          </div>
        </v-card-text>
      </v-card>
    </div>
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
            <b>Definitions:</b> <span v-html="word.definitions"></span>
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

  <div
    v-if="anglishFuzzyResults &&
    !('IGNORE_ME' in anglishFuzzyResults) &&
    Object.keys(anglishFuzzyResults).length > 0"
  >
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
        v-for="([pos, entries], index) in Object.entries(definitions)"
        :key="entriesIndex(entries, index)"
        class="mb-5"
      >
       <!-- {{ console.log(`index = ${{ pos }}`) }} -->
        <!-- <div
          v-if="entries.length >= 1 && entries[index ?? 0]"
        > -->
        <div>
          <v-card
            v-for="(entry, index) in entries"
            :key="index"
          >
            <v-card-item>
              <v-card-title>
                <router-link :to="`/word/${entry.word}`">
                  {{ entry.word }}
                  <span
                    v-if="entry.word != entry.anglish_spelling &&
                    entry.anglish_spelling"
                  >
                    ({{ entry.anglish_spelling }})
                  </span>
                </router-link>
              </v-card-title>

              <v-card-subtitle>{{ entry.taken_from }}</v-card-subtitle>
            </v-card-item>

            <v-card-text style="padding-bottom: 10px !important;">
              <div>
                <p>
                  <i>{{ pos }}</i>
                </p>

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
    </div>

    <!-- Germanic-like words from GT -->
  </div>

  <div v-if="!germanicEnglishWord &&
  !(searchedWord in englishToAnglishDictionary) &&
  !(searchedWord in anglishToEnglishDictionary) &&
  Object.keys(anglishFuzzyResults).length < 1">
  <!-- <div v-else> -->
    <h2><center>No results found!</center></h2>

    <center>
      <div id="not-found">
        <p>We're sorry, but '{{ searchedWord }}' could not be found.</p>

        <p>Try to search using only a lemma/the dictionary form of words.</p>

        <p>
          E.g. instead of "bears", try "bear".
          Instead of "broke" try "break".
        </p>

        <p>
          Keep in mind regional spelling differences. The Wordbook uses the
          <a href="https://en.wikipedia.org/wiki/Oxford_spelling">
            Oxford spelling variant of British English</a>. That means using -our
            words like armour and flavour, along with -ize endings like realize
            and utilize (but not -yse endings like analyse).
        </p>

        <p>
          Also, check if your capitalization is correct. Most words are lower
          case, but some words—such as Proper Nouns—use capital letters.
        </p>
      </div>
    </center>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { AnglishToEnglish, AnglishToEnglishEntry  } from "@/types";
import { storeToRefs } from "pinia";
import { nextTick } from "vue";
import { onMounted, watch } from "vue";
import { getCurrentInstance } from "vue";
import { Ref, computed, ref } from "vue";
import { useRoute } from "vue-router";

const store = useAppStore();
const {
  anglishToEnglishDictionary,
  englishToAnglishDictionary,
  englishToGermanicDictionary,
} = storeToRefs(store);

// const props = defineProps<{
//   // germanicEnglishWord?: false,
//   // anglishEnglishWord: EnglishWord,
//   searchedWord: string,
// }>();

const searchedWord = computed(() => {
  return route.query.word?.toString() ?? '';
});

const germanicEnglishWord = computed(() => {
  return searchedWord.value in englishToGermanicDictionary;
});

const emptyAnglishFuzzyResults: AnglishToEnglish = {
  "IGNORE_ME": {
    "POS": [{
      word: "",
      anglish_spelling: "",
      definitions: "",
      pos: "",
      forebear: "",
      taken_from: "",
      notes: "",
      is_anglish: false,
    }]
  }
};
const anglishFuzzyResults: Ref<AnglishToEnglish> = ref(structuredClone(emptyAnglishFuzzyResults));

async function refreshSearch() {
  anglishFuzzyResults.value = structuredClone(emptyAnglishFuzzyResults);
  delete anglishFuzzyResults.value["IGNORE_ME"];

  while ("NOT_LOADED" in anglishToEnglishDictionary.value) {
    console.log("Waiting for ATE dict to load…");
    await new Promise(resolve => setTimeout(resolve, 300));

  }

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
        if (subDefinition.is_anglish) {
          continue;
        }

        if (searchedWord.value.trim() === "") {
          continue;
        }

        if (subDefinition.definitions.includes(searchedWord.value)) {
          subDefinition.definitions = subDefinition.definitions.replaceAll(
            searchedWord.value, `<mark>${searchedWord.value}</mark>`
          )

          foundMatch = true;
        }
      }
    }

    if (foundMatch) {
      anglishFuzzyResults.value[word] = definitions;
    }
  }
}

onMounted(() => {
  console.log("Mounted!");
  refreshSearch();
});

// onUpdated(() => {
//   refreshSearch();
// });

const route = useRoute();
const instance = getCurrentInstance();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(route, (_to, _from) => {
  // console.log("Route changed!");
  // console.log(`before dict = ${JSON.stringify(anglishFuzzyResults.value)}`);
  refreshSearch();
  instance?.proxy?.$forceUpdate();
  // console.log(`after dict = ${JSON.stringify(anglishFuzzyResults.value)}`);
});

function entriesIndex(entries: AnglishToEnglishEntry[], index: number) {
  if (entries.length > index) {
    return entries[index ?? 0].word;
  } else {
    return index.toString();
  }
}
</script>

<style scoped>
p {
  padding-bottom: 5px;
}

h2 {
  padding-bottom: 8px;
}

div#not-found>p {
  padding-bottom: 16px;
}
</style>
