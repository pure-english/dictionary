<template>
  <v-container>
    <!-- Anglish letters -->
    <v-row v-if="!hideLetters">
      <v-col>
        <h4>Anglish Letters</h4>
        <p>Press to add a letter to your clipboard.</p>

        <v-chip
          v-for="letter in anglishLetters"
          :key="letter"
          @click="copyContent(letter)"
          class="mr-2"
        >
          {{ letter }}
        </v-chip>
      </v-col>
    </v-row>

    <!-- User input -->
    <v-row justify="center">
      <v-col cols="12">
        <v-textarea
          variant="outlined"
          counter
          v-model="rawText"
          id="user-input"
          clearable
        >
        </v-textarea>
      </v-col>
    </v-row>

    <!-- Word origin filtering -->
    <!-- Origins -->
    <v-row v-if="Object.keys(sortedWords).length > 1">
      <v-col>
        <h4>Origins</h4>

        <!-- multiple -->
        <v-chip-group
          v-model="selectedOrigin"
          column
        >
          <v-chip
            v-for="(origin, index) in Object.keys(sortedWords)"
            :key="index"
            filter
            outlined
            variant="outlined"
            @click="chosenLanguage = origin"
            :style="`color: ${originColors[origin as keyof typeof originColors].color};`"
          >
            {{ origin }} ({{ sortedWords[origin].length }})
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- Sub-origins -->

    <!-- List of words with highlighting -->
    <v-row v-if="splitRawText.length > 0">
      <v-col>
        <h4>Words</h4>
        <p>Press on a word to search the dictionary.</p>

        <v-chip-group
          mandatory
          selected-class="text-purple"
        >
          <div v-if="(!selectedOrigin) || selectedOrigin === -1">
            <editor-etymology-chip
              v-for="(word, index) in textWithEtymology"
              :key="index"
              @lookup="lookupWord = word.word"
              :word="word.word"
              :language="word.origin"
            />
          </div>

          <div v-else>
            <editor-etymology-chip
              v-for="(word, index) in sortedWords[chosenLanguage]"
              :key="index"
              @lookup="lookupWord = word"
              :word="word"
              :language="chosenLanguage"
            />
          </div>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { useEditorStore } from "@/store/editor";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { ref } from "vue";

import EditorEtymologyChip from "@/components/EditorEtymologyChip.vue";
import { watch } from "vue";
import { originColors } from "@/variables";

const editorStore = useEditorStore();
const {
  autoSort,
  lookupWord,
  hideLetters,
} = storeToRefs(editorStore);
const appStore = useAppStore();
const {
  etymologies,
} = storeToRefs(appStore);

const selectedOrigin = ref(-1);
const rawText = ref("");
const chosenLanguage = ref("");

const anglishLetters = ["Þ", "þ", "Ƿ", "ƿ"];

const splitRawText = computed(() => {
  const words = rawText.value.match(/(Þ*þ*Ƿ*ƿ*\b[^\s]+\bÞ*þ*Ƿ*ƿ*)/g);
  if (autoSort.value) {
    words?.sort();
  }
  return [...new Set(words)];
});
const textWithEtymology = computed(() => {
  const words = splitRawText.value.map((word) => {
    if (word in etymologies.value) {
      return {
        "word": word,
        ...etymologies.value[word],
      }
    } else if (word.toLowerCase() in etymologies.value) {
      return {
        "word": word.toLowerCase(),
        ...etymologies.value[word],
      }
    } else {
      return {
        "word": word,
        "origin": "Unknown",
        "sub_origins": [],
      }
    }
  });

  return words;
});
const sortedWords = computed(() => {
  const sorted: {
    [origin: string]: Array<string>,
  } = {};

  textWithEtymology.value.map((word) => {
    if (word.origin) {
      if (word.origin in sorted) {
        if (!(word.word in sorted[word.origin])) {
          sorted[word.origin].push(word.word);
        }
      } else {
        sorted[word.origin] = [word.word];
      }

      sorted[word.origin] = [...new Set(sorted[word.origin])] ?? [];
    }

    if (word.sub_origins) {
      for (const subOrigin of word.sub_origins) {
        if (subOrigin) {
          if (subOrigin in sorted) {
            if (!(word.word in sorted[subOrigin])) {
              sorted[subOrigin].push(word.word);
            }
          } else {
            sorted[subOrigin] = [word.word];
          }
        }

        sorted[subOrigin] = [...new Set(sorted[subOrigin])] ?? [];
      }
    }
  });

  return sorted;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(sortedWords, async (_oldSortedWords, _newSortedWords) => {
  const userInput = document.getElementById("user-input");

  console.log(`userInput === document.activeElement = ${userInput === document.activeElement}`);
  console.log(`selectedOrigin.value = ${selectedOrigin.value}`);

  if (!(userInput === document.activeElement && selectedOrigin.value)) {
    const newValue = Object.keys(sortedWords.value).indexOf(chosenLanguage.value);
    selectedOrigin.value = newValue;
  }
  // console.log(`Watch triggered: ${selectedOrigin.value} > ${newValue} (index of ${chosenLanguage.value})\nkeys = '${Object.keys(sortedWords.value)}'`);

});

const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
</script>
