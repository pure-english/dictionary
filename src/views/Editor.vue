<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-textarea
          variant="outlined"
          counter
          v-model="rawText"
        >
        </v-textarea>

        <!-- <input-highlighter
          style="min-width: 700px; min-height: 300px;"
          v-model="rawText"
          :rules="rules"
          placeholder=""
        >
        </input-highlighter> -->

        <!-- <div>

          <highlightInput
            v-model="rawText"
            :keywords="[lookupWord]"
            color="#F56C6C"
            class="editor-input"
          >
          </highlightInput>
        </div> -->

        <!-- <div class="outer">
          <div class="inner">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>

          <div class="inner">
            2
          </div>
        </div> -->
      </v-col>
    </v-row>

    <!-- <v-row justify="center" style="margin: auto;">
      <v-col>
        <div class="d-flex align-center justify-center w-100 h-100">
          <v-btn
            @click="analyse()"
          >
            Analyse
          </v-btn>
        </div>
      </v-col>
    </v-row> -->

    <!-- Word origin filtering -->
    <!-- Origins -->
    <v-row>
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
          >
            {{ origin }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <!-- Sub-origins -->

    <!-- List of words with highlighting -->
    <v-row v-if="splitRawText.length > 0">
      <v-col>
        <h4>Words</h4>

        <v-chip-group
          mandatory
          selected-class="text-primary"
        >
          <editor-etymology-chip
            v-for="(word, index) in sortedWords[Object.keys(sortedWords)[selectedOrigin]]"
            :key="index"
            @lookup="lookupWord = word"
            :word="word"
            :language="Object.keys(sortedWords)[selectedOrigin]"
          >
            <!--
            @lookup="lookupWord = word.word"
            :word="word.word"
            :language="word.origin"
             -->
          </editor-etymology-chip>

          <!-- <v-chip
            v-for="(word, index) in splitRawText"
            :key="index"
            @click="lookupWord = word"
          >
            {{ word }}
          </v-chip> -->
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

const selectedOrigin = ref();
const rawText = ref("");
const splitRawText = computed(() => {
  const words = rawText.value.match(/(\b[^\s]+\b)/g);
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
      }
    }
  });

  return sorted;
});

const editorStore = useEditorStore();
const {
  autoSort,
  lookupWord,
} = storeToRefs(editorStore);
const appStore = useAppStore();
const {
  etymologies,
} = storeToRefs(appStore);
</script>

<style scoped>
/* .editor-input {
  min-height: 200px;
  overflow-wrap: normal;
  display: flex;
  flex-grow: 1;
}

.inner {
  position: absolute;
}

.outer {
  position: sticky;
} */
</style>
