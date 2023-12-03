<template>
  <!-- <h1>Word Definition</h1>
  <p>Your word is '{{ $route.params.word }}'</p> -->

  <v-main class="fill-height bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="2"
        >
          <v-sheet
            rounded="lg"
            min-height="268"
          >
            <!-- Definition stuff -->
            Sheet 1
          </v-sheet>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-sheet
            min-height="70vh"
            rounded="lg"
          >
            <h2>
              <center>Definitions for '{{ $route.params.word }}'</center>
            </h2>

            <div v-if="$route.params.word.toString() in anglishToEnglishDictionary">
              <h3><u><center>Anglish</center></u></h3>

              <div v-for="(definitions, pos) in foundWord" :key="pos">
                <h4><u>{{ pos }}</u></h4>

                <ol>
                    <li v-for="(definition, index) in definitions" :key="index">
                      <p>{{ definition.definitions }}</p>

                      <p>
                        <b>Spelling:</b> {{ definition.word }}
                        <span v-if="definition.anglish_spelling">
                          ({{ definition.anglish_spelling }})
                        </span>
                      </p>

                      <p><b>Forebear:</b> {{ definition.forebear }}</p>

                      <p><b>Taken From:</b> {{ definition.taken_from }}</p>

                      <p><b>Notes:</b> {{ definition.notes }}</p>
                    </li>
                </ol>
              </div>
            </div>
            <div v-else>
              <p>
                <b>No word '{{ $route.params.word }}' found in the Anglish Wordbook!</b>
              </p>

              <p>
                Perhaps try making it yourself!
              </p>
            </div>
          </v-sheet>
        </v-col>

        <!-- <v-col
          cols="12"
          md="2"
        >
          <v-sheet
            rounded="lg"
            min-height="268"
          >
            Sheet 3
          </v-sheet>
        </v-col> -->
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { AnglishToEnglish, AnglishWord } from '@/types';
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useAppStore();
const { anglishToEnglishDictionary } = storeToRefs(store);
const foundWord = anglishToEnglishDictionary.value[route.params.word.toString()];

// Empty AnglishToEnglish dict
// const anglishToEnglishDictionary: Ref<AnglishToEnglish> = ref({
//   "english_word": {
//     "pos": [{
//       word: "",
//       anglish_spelling: "",
//       definitions: "",
//       pos: "",
//       forebear: "",
//       taken_from: "",
//       notes: "",
//     }]
//   }
// });
// const foundWord: Ref<AnglishWord> = ref({
//   "pos": [{
//       word: "",
//       anglish_spelling: "",
//       definitions: "",
//       pos: "",
//       forebear: "",
//       taken_from: "",
//       notes: "",
//     }]
// });

// fetch("/anglish_to_english.json").then((a) => {
//   a.json().then((data: AnglishToEnglish) => {
//     anglishToEnglishDictionary.value = data;
//     console.log("Loaded words!");
//     foundWord.value = anglishToEnglishDictionary.value[route.params.word.toString()];
//   })
// });
</script>

<style scoped>
h2 {
  padding-top: 23px;
}

h4 {
  padding-top: 8px;
  padding-left: 30px;
}

ol {
  padding-left: 35px;
}

li {
  padding-top: 14px;
}

p {
  padding-bottom: 5px;
}
</style>
