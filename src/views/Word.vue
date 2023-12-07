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
            <!-- Definition stuff
            Sheet 1 -->
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

              {{ console.log(`Found word: ${foundWord}`) }}

              <div v-for="(definitions, pos) in foundWord" :key="pos">
                {{ console.log(`definitions: ${definitions}`) }}
                {{ console.log(`pos: ${pos}`) }}
                <h4><u>{{ pos }}</u></h4>

                <ol>
                    <li v-for="(definition, index) in definitions" :key="index">
                      <p><span v-html="definition.definitions"></span></p>

                      <p>
                        <b>Spelling:</b> {{ definition.word }}
                        <span v-if="definition.anglish_spelling">
                          ({{ definition.anglish_spelling }})
                        </span>
                      </p>

                      <p><b>Forebear:</b> {{ definition.forebear }}</p>

                      <p><b>Taken From:</b> {{ definition.taken_from }}</p>

                      <p v-if="definition.notes">
                        <b>Notes:</b> {{ definition.notes }}
                      </p>
                    </li>
                </ol>
              </div>
            </div>
            <div v-else>
              <center>
                <p>
                  <b>No word '{{ $route.params.word }}' found in the Anglish Wordbook!</b>
                </p>

                <p>
                  Perhaps try making it yourself!
                </p>
              </center>
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
import { useRoute } from 'vue-router';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { AnglishToEnglish } from '@/types';

const route = useRoute();
const store = useAppStore();
const { anglishToEnglishDictionary, foundWord } = storeToRefs(store);

while (!foundWord) {
  console.log("te");
  await new Promise(r => setTimeout(r, 2000));
}



// If the dictionary isn't loaded
if ("NOT_LOADED" in anglishToEnglishDictionary.value) {
  const anglishToEnglishPath = process.env.NODE_ENV === 'production'
    ? "/dictionary/anglish_to_english.json"
    : "/anglish_to_english.json";

  fetch(anglishToEnglishPath).then((a) => {
    a.json().then((data: AnglishToEnglish) => {
      anglishToEnglishDictionary.value = data;
      console.log("Dictionary loaded only now!");
      foundWord.value = anglishToEnglishDictionary.value[route.params.word.toString()];
    })
  });
} else {
  console.log("Dictionary already loaded!")
  foundWord.value = anglishToEnglishDictionary.value[route.params.word.toString()];
}

// console.log(`foundWord = ${foundWord.value}\n${JSON.stringify(foundWord.value)}`);

// This will potentially force an update
// JSON.stringify(foundWord.value);
</script>

<script lang="ts">
// export default {
//   computed: {
//     ...mapStores(useAppStore),
//     ...mapState(useAppStore, ["anglishToEnglishDictionary", "foundWord"]),
//   },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // beforeRouteEnter(to, __from, next) {
  //   // next(vm => {

  //   // });

  //   // const route = useRoute();
  //   // const route = getRoute();
  //   const store = useAppStore();
  //   const { anglishToEnglishDictionary, foundWord } = storeToRefs(store);
  //   // console.log(route);

  //   // console.log(`anglishToEnglish = ${anglishToEnglishDictionary.value}\n\n${JSON.stringify(anglishToEnglishDictionary.value)}`);
  //   // console.log(`atedvalue = ${anglishToEnglishDictionary.value}`)

  //   while (!anglishToEnglishDictionary.value) {
  //     console.log("te")
  //   }

  //   // If the dictionary isn't loaded
  //   if (anglishToEnglishDictionary.value["NOT_LOADED"]) {
  //     const anglishToEnglishPath = process.env.NODE_ENV === 'production'
  //       ? "/dictionary/anglish_to_english.json"
  //       : "/anglish_to_english.json";

  //     fetch(anglishToEnglishPath).then((a) => {
  //       a.json().then((data: AnglishToEnglish) => {
  //         anglishToEnglishDictionary.value = data;
  //         // console.log("Loaded AnglishToEnglish dictionary!");
  //       })
  //     });

  //     console.log("Dictionary loaded only now!");
  //     foundWord.value = anglishToEnglishDictionary.value[to.params.word.toString()];
  //   } else {
  //     console.log("Dictionary already loaded!")
  //     foundWord.value = anglishToEnglishDictionary.value[to.params.word.toString()];
  //   }

  //   console.log(`foundWord = ${foundWord.value}\n${JSON.stringify(foundWord.value)}`);

  //   // This will potentially force an update
  //   JSON.stringify(foundWord.value);
  // },

  // beforeRouteUpdate(to, from) {
  //   const store = useAppStore();
  //   const { anglishToEnglishDictionary, foundWord } = storeToRefs(store);
  //   // console.log(route);

  //   // console.log(`anglishToEnglish = ${anglishToEnglishDictionary.value}\n\n${JSON.stringify(anglishToEnglishDictionary.value)}`);
  //   // console.log(`atedvalue = ${anglishToEnglishDictionary.value}`)

  //   while (!anglishToEnglishDictionary.value) {
  //     console.log("te")
  //   }

  //   // If the dictionary isn't loaded
  //   if (anglishToEnglishDictionary.value["NOT_LOADED"]) {
  //     const anglishToEnglishPath = process.env.NODE_ENV === 'production'
  //       ? "/dictionary/anglish_to_english.json"
  //       : "/anglish_to_english.json";

  //     fetch(anglishToEnglishPath).then((a) => {
  //       a.json().then((data: AnglishToEnglish) => {
  //         anglishToEnglishDictionary.value = data;
  //         // console.log("Loaded AnglishToEnglish dictionary!");
  //       })
  //     });

  //     console.log("Dictionary loaded only now!");
  //     foundWord.value = anglishToEnglishDictionary.value[to.params.word.toString()];
  //   } else {
  //     console.log("Dictionary already loaded!")
  //     foundWord.value = anglishToEnglishDictionary.value[to.params.word.toString()];
  //   }

  //   console.log(`foundWord = ${foundWord.value}\n${JSON.stringify(foundWord.value)}`);

  //   // This will potentially force an update
  //   JSON.stringify(foundWord.value);
  // },
// }
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
