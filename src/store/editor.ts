import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditorStore = defineStore("editor", () => {
  const lookupWord = ref("dictionary");

  const autoSort = ref(false);
  const autoAnalyse = ref(false);

  return {
    lookupWord,
    autoSort,
    autoAnalyse,
  }
});
