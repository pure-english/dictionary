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
    <!-- v-row -->
    <v-row>
      <v-col>
        <h4>Origins</h4>

        <v-chip-group
          column
          multiple
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

    <!-- List of words with highlighting -->
    <v-row>
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

const emit = defineEmits(['lookup']);

const rawText = ref("");
const splitRawText = computed(() => {
  return [...new Set(rawText.value.match(/(\b[^\s]+\b)/g)?.sort())];
});

const store = useEditorStore();
const {
  autoAnalyse,
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
