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

    <v-row justify="center" style="margin: auto;">
      <v-col>
        <div class="d-flex align-center justify-center w-100 h-100">
          <v-btn
            @click="analyse()"
          >
            Analyse
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Word origin filtering -->
    <!-- Origins -->
    <v-row>
      <v-col>
        <h4>Origins</h4>

        <!-- multiple -->
        <v-chip-group
          column
        >
          <v-chip
            v-for="(origin, index) in ['Norse', 'Old English']"
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
          <v-chip
            v-for="(word, index) in splitRawText"
            :key="index"
            @click="lookupWord = word"
          >
            {{ word }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useEditorStore } from "@/store/editor";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { ref } from "vue";

const rawText = ref("");
const splitRawText = computed(() => {
  const words = rawText.value.match(/(\b[^\s]+\b)/g);
  if (autoSort.value) {
    words?.sort();
  }
  return [...new Set(words)];
});

// const rules = computed(() => {
//   return [
//     {
//       regex: new RegExp(`/${lookupWord.value}/`, "gim"),
//       class: "highlight",
//       tag: "span",
//     }
//   ];
// });

const store = useEditorStore();
const {
  autoAnalyse,
  autoSort,
  lookupWord,
} = storeToRefs(store);

function analyse() {
  console.log("Analysing input…");

  if (autoAnalyse.value) {
    console.log("(Did this automatically)");
  }

  console.log(`Text: ${rawText.value}`);
  console.log(`Split text: ${splitRawText.value}`);
}
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
