import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditorStore = defineStore("editor", () => {
  const lookupWord = ref("dictionary");
  const searchDrawer = ref(true);

  const autoSort = ref(false);
  const autoAnalyse = ref(false);
  const dictionarySearch = ref("");

  return {
    lookupWord,
    autoSort,
    autoAnalyse,
    dictionarySearch,
    searchDrawer,
  }
});
