<!-- eslint-disable vue/no-unused-vars -->
<template>
  <!-- Etymology -->
  <div class="mb-5" width="350" v-if="!hideEtymology">
    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="primary"
      >
        <v-tab value="wiktionary">
          Overview
        </v-tab>
        <v-tab value="etymonline">Details</v-tab>
        <!-- <v-tab value="OED">OED</v-tab> -->
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item
            value="wiktionary"
            v-if="searchedWord in etymologies"
          >
            <etymology
              :searched-word="searchedWord"
              :etymologies="etymologies"
            />
          </v-window-item>

          <!-- Lowercase alternative -->
          <v-window-item
            value="wiktionary"
            v-else-if="searchedWord.toLowerCase() in etymologies"
          >
            <etymology
              :searched-word="searchedWord.toLowerCase()"
              :etymologies="etymologies"
            />
          </v-window-item>

          <!-- Title case alternative -->
          <v-window-item
            value="wiktionary"
            v-else-if="toTitleCase(searchedWord) in etymologies"
          >
            <etymology
              :searched-word="toTitleCase(searchedWord)"
              :etymologies="etymologies"
            />
          </v-window-item>

          <v-window-item value="wiktionary" v-else>
            <h4>Could not find the etymology of '{{ searchedWord }}'!</h4>
            <p>Some Wiktionary words are made up of parts, such as </p>
          </v-window-item>

          <v-window-item value="etymonline">
            <iframe
              :src="`https://etymonline.com/word/${searchedWord}`"
              id="etymologyIFrame"
              height="500"
              frameborder="0"
              referrerpolicy="no-referrer"
              style="object-fit: contain; max-height: 500px;"
            >
            </iframe>
          </v-window-item>

          <!-- <v-window-item value="OED">
            OED etymology
          </v-window-item> -->
        </v-window>
      </v-card-text>
    </v-card>
  </div>

  <!-- False friends -->
  <div
    v-if="!hideFalseFriends && (searchedWord.toLowerCase() in (falseFriends ?? {}))"
    class="mb-6"
  >
    <h2><u><center>False Friend</center></u></h2>

    <v-card class="mt-2">
      <v-card-item>
        <v-card-title>
          {{ searchedWord.toLowerCase() }}
        </v-card-title>
      </v-card-item>

      <v-card-text>
        <p v-html="falseFriends[searchedWord.toLowerCase()]"></p>
      </v-card-text>
    </v-card>
  </div>

  <!-- Germanic English alternatives -->
  <div
    v-if="!hideGermanicAlternatives &&
    (searchedWord in englishToGermanicDictionary ||
    searchedWord.toLowerCase() in englishToGermanicDictionary ||
    toTitleCase(searchedWord) in englishToGermanicDictionary)"
    class="mb-8"
  >
    <h2><u><center>Germanic English Alternatives</center></u></h2>

    <!-- englishToGermanicDictionary[searchedWord] -->
    <div
      v-for="(words, pos) in GTSearch(englishToGermanicDictionary, searchedWord)"
      :key="pos"
    >
      <h3 class="mb-5"><center>{{ pos }}</center></h3>
      <v-card v-for="(word, index) in words" :key="index" class="mb-5">
        <v-card-item>
          <v-card-title>
            {{ searchedWord.toLowerCase() }}
          </v-card-title>
        </v-card-item>

        <v-card-text>
          <!-- {{ word }} -->

          <div v-if="word.alternatives">
            <p><b>Alternatives:</b></p>

            <p v-html="word.alternatives"></p>
          </div>

          <p v-if="word.germanic_like_alternatives">
            <b>Germanic-like Alternatives:</b>
            {{ word.germanic_like_alternatives }}
          </p>

          <div v-if="word.details">
            <p><b>Details:</b></p>

            <p v-html="word.details"></p>
          </div>

          <div v-if="word.sub_lemmas.length >= 1">
            <p style="padding-top: 10px; padding-bottom: 10px;">
              <b>Sub-lemmas:</b>
            </p>

            <v-card
              v-for="(lemma, index) in word.sub_lemmas"
              :key="index"
              class="mb-5"
            >
              <v-card-item>
                <v-card-title>
                  {{ lemma.lemma }}
                </v-card-title>

                <v-card-subtitle>
                  {{ lemma.pos }}
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                <div v-if="lemma.alternatives">
                  <p><b>Alternatives:</b></p>

                  <p v-html="lemma.alternatives"></p>
                </div>

                <p v-if="lemma.germanic_like_alternatives">
                  <b>Germanic-like Alternatives:</b>
                  {{ lemma.germanic_like_alternatives }}
                </p>

                <div v-if="lemma.details">
                  <p><b>Details:</b></p>

                  <p v-html="lemma.details"></p>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>

  <!-- Anglish Alternatives -->
  <div v-if="!hideAnglishAlternatives &&
    (searchedWord in englishToAnglishDictionary ||
    searchedWord.toLowerCase() in englishToAnglishDictionary ||
    toTitleCase(searchedWord) in englishToAnglishDictionary)">
    <h2><u><center>Anglish Alternatives</center></u></h2>
    <!--
      v-for="(words, pos) in englishToAnglishDictionary[searchedWord]"
     -->
    <div
      v-for="(words, pos) in ETASearch(englishToAnglishDictionary, searchedWord)"
      :key="pos"
    >
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

  <!-- Anglish Words -->
  <div v-if="!hideAnglishWords &&
    (searchedWord in anglishToEnglishDictionary ||
    searchedWord.toLowerCase() in anglishToEnglishDictionary ||
    toTitleCase(searchedWord) in anglishToEnglishDictionary)">
    <h2><u><center>Anglish Words</center></u></h2>

    <!-- anglishToEnglishDictionary[searchedWord] -->
    <div v-for="(words, pos) in ATESearch(anglishToEnglishDictionary, searchedWord)" :key="pos">
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

  <!-- Other results -->
  <div
    v-if="anglishFuzzyResults &&
    !('IGNORE_ME' in anglishFuzzyResults) &&
    Object.keys(anglishFuzzyResults).length > 0"
  >
    <h2><u><center>Other Results</center></u></h2>
    <!-- Fuzzy search of Germanic Thesaurus -->

    <!-- Word match of Anglish Wordbook -->
    <div v-if="anglishExactResults.length >= 1">
      <h4><center>Results with exact search term</center></h4><br/>
      <div v-for="(entry, index) in anglishExactResults" :key="index">
        <v-card>
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

            <v-card-subtitle>
              {{ entry.taken_from }}
            </v-card-subtitle>
          </v-card-item>

          <v-card-text style="padding-bottom: 10px !important;">
            <div>
              <p><b><u>{{ entry.pos }}</u></b></p>

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

        <br/>
      </div>
    </div>

    <!-- Fuzzy search of Anglish Wordbook -->
    <div v-if="anglishFuzzyResults.length >= 1">
      <h4><center>Results containing search term</center></h4><br/>
      <div
        v-for="(entry, index) in anglishFuzzyResults"
        :key="index"
      >
        <v-card>
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

            <v-card-subtitle>
              {{ entry.taken_from }}
            </v-card-subtitle>
          </v-card-item>

          <v-card-text style="padding-bottom: 10px !important;">
            <div>
              <p><b><u>{{ entry.pos }}</u></b></p>

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

        <br/>
      </div>
    </div>
  </div>

  <!-- No results found! -->
  <div v-if="!(searchedWord in englishToGermanicDictionary) &&
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
          E.g. "bear" instead of "bears".
          "break" instead of "broke".
          "fly" instead of "to fly".
          "good" instead of "better".
          "realize" instead of "to realize".
          "car" instead of "a car".
        </p>

        <p>
          Keep in mind regional spelling differences:
          <br/><br/>
          The Wordbook uses the
          <a href="https://en.wikipedia.org/wiki/Oxford_spelling">
            Oxford spelling variant of British English</a>. That means using -our
            words like armour and flavour, along with -ize endings like realize
            and utilize (but not -yze endings; -yse endings, like analyse).
          <br/><br/>
          The Germanic Thesaurus uses American English (-or, -ize, -yze).
        </p>
      </div>
    </center>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { AnglishToEnglishEntry, AnglishWord, EnglishWord, GermanicEntries  } from "@/types";
import { storeToRefs } from "pinia";
import { onMounted, toRaw, watch } from "vue";
import { getCurrentInstance } from "vue";
import { Ref, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { falseFriends } from "@/variables";

import Etymology from "@/components/Etymology.vue";

const store = useAppStore();
const {
  anglishToEnglishDictionary,
  englishToAnglishDictionary,
  englishToGermanicDictionary,
  etymologies,
} = storeToRefs(store);

// The default of these, if not passed down, will be false. This is intended
// behaviour.
const props = defineProps({
  isEmbedded: Boolean,
  word: String,
  hideEtymology: Boolean,
  hideFalseFriends: Boolean,
  hideGermanicAlternatives: Boolean,
  hideAnglishAlternatives: Boolean,
  hideAnglishWords: Boolean,
  hideOtherResults: Boolean,
});

const searchedWord = computed(() => {
  if (props.isEmbedded) {
    return props.word ?? "";
  }

  // If it's not embedded, return the route word
  return route.query.word?.toString() ?? '';
});

const emptyAnglishFuzzyResults: Array<AnglishToEnglishEntry> = [];
const anglishFuzzyResults: Ref<Array<AnglishToEnglishEntry>> = ref([]);
const anglishExactResults: Ref<Array<AnglishToEnglishEntry>> = ref([]);
const tab = ref("wiktionary");  // or "etymonline"

async function refreshSearch() {
  // console.log("Searching!");

  // if (searchedWord.value in etymologies.value) {
  //   console.log(`'${searchedWord.value}' is in the etymology list!`);
  //   console.log(`The etymology is: ${JSON.stringify(etymologies.value[searchedWord.value])}`);
  // }

  // else {
  //   tab.value = "etymonline";
  // }

  tab.value = "wiktionary"; // Reset to default


  document.title = `'${searchedWord.value}' - Online Anglish Dictionary`;

  anglishFuzzyResults.value = structuredClone(emptyAnglishFuzzyResults);
  anglishExactResults.value = structuredClone(emptyAnglishFuzzyResults);
  // delete anglishFuzzyResults.value["IGNORE_ME"];

  while ("NOT_LOADED" in anglishToEnglishDictionary.value) {
    console.log("Waiting for ATE dict to load…");
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_word, definitions] of Object.entries(anglishToEnglishDictionary.value)) {
    let foundExactMatch = false;
    let foundExactMatchSwitch = false;
    let foundFuzzyMatch = false;

    let newFuzzyDefinitions: AnglishToEnglishEntry[] = [];
    let newExactDefinitions: AnglishToEnglishEntry[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_pos, definition] of Object.entries(definitions)) {
      for (const subDefinition of definition) {
        const clonedSubDefinition = structuredClone(toRaw(subDefinition));

        if (clonedSubDefinition.is_anglish) {
          continue;
        }

        if (searchedWord.value.trim() === "") {
          continue;
        }

        const exactRegEx = new RegExp(`\\b(${searchedWord.value})\\b`, "ig");
        const toReplace = [...new Set(clonedSubDefinition.definitions.matchAll(exactRegEx))];
        // console.log(`exact matches = ${toReplace}`);
        // for (const match of toReplace) {
        //   console.log(`match = ${match}`);
        // }
        for (const changes of toReplace) {
          for (const change of changes) {
            const changeString = change.toString();
            clonedSubDefinition.definitions = clonedSubDefinition.definitions.replaceAll(
              changeString, `<mark>${changeString.toString()}</mark>`
            );

            // If it has made it here, then there's been a match
            foundExactMatch = true;
            foundExactMatchSwitch = true;
          }
        }

        if (foundExactMatchSwitch) {
          newExactDefinitions.push(clonedSubDefinition);
          foundExactMatchSwitch = false;
        }

        // Find fuzzy matches
        if (clonedSubDefinition.definitions.toLowerCase().includes(searchedWord.value.toLowerCase())) {
          // Case-insensitive replacing
          // g = global; i = case-insensitive
          const regEx = new RegExp(`(?<searchMatch>${searchedWord.value})`, "ig");

          // clonedSubDefinition.definitions = clonedSubDefinition.definitions.replaceAll(
          //   regEx, `<mark>${searchedWord.value}</mark>`
          // );

          const toReplace = [...new Set(clonedSubDefinition.definitions.matchAll(regEx))];

          for (const changes of toReplace) {
            for (const change of changes) {
              const changeString = change.toString();
              clonedSubDefinition.definitions = clonedSubDefinition.definitions.replaceAll(
                changeString, `<mark>${changeString.toString()}</mark>`
              );
            }
          }

          foundFuzzyMatch = true;

          newFuzzyDefinitions.push(clonedSubDefinition);
        }
      }
    }

    if (foundFuzzyMatch) {
      anglishFuzzyResults.value = anglishFuzzyResults.value.concat(newFuzzyDefinitions);
    }

    if (foundExactMatch) {
      anglishExactResults.value = anglishExactResults.value.concat(newExactDefinitions);
    }
  }
}

onMounted(async () => {
  console.log("Mounted!");
  refreshSearch();

  document.title = `'${searchedWord.value}' - Online Anglish Dictionary`;

  const searchBar = document.getElementById("searchBar");
  window.addEventListener("keyup", (e) => {
    // If the key is pressed and the search bar is not focused
    if (e.code === "KeyU" && !(document.activeElement === searchBar)) {
      window.scrollTo(0, 0);
    } else if (e.key === "Enter" && (document.activeElement === searchBar)) {
      window.scrollTo(0, 0);
      // Moved to AppBar.vue
      // searchBar?.blur();
    } else if (e.code === "KeyD" && !(document.activeElement === searchBar)) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  // while (etymologyIFrame.value === null) {
  //   console.log("Waiting for etymology iframe to load…");
  //   await new Promise(resolve => setTimeout(resolve, 300));
  // }
  // etymologyIFrame.value.onload = function () {
  //   etymologyIFrame.value?.contentWindow?.scrollBy(0, 444);
  // };
});

const route = useRoute();
const instance = getCurrentInstance();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(route, (_to, _from) => {
  refreshSearch();
  window.scrollTo(0, 0);
  instance?.proxy?.$forceUpdate();
});

function toTitleCase(str: string) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

function GTSearch(dict: any, searchTerm: string): GermanicEntries {
  return {
    ...dict[searchTerm.toUpperCase()],
    ...dict[searchTerm.toUpperCase()],
    ...dict[searchTerm.toLowerCase()],
    ...dict[searchTerm],
  }
}

function ETASearch(dict: any, searchTerm: string): EnglishWord {
  return {
    ...dict[searchTerm.toUpperCase()],
    ...dict[searchTerm.toUpperCase()],
    ...dict[searchTerm.toLowerCase()],
    ...dict[searchTerm],
  };
}

function ATESearch(dict: any, searchTerm: string): AnglishWord {
  return {
    ...dict[searchTerm.toUpperCase()],
    ...dict[searchTerm.toUpperCase()],
    ...dict[searchTerm.toLowerCase()],
    ...dict[searchTerm],
  };
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

iframe {
  display: block;
  width: 100%;
}
</style>
