import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export const useEditorStore = defineStore("editor", () => {
  const lookupWord = ref("dictionary");
  const autoAnalyse = ref(false);

  return {
    lookupWord,
    autoAnalyse,
  }
});
