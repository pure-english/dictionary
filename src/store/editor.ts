import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditorStore = defineStore("editor", () => {
  const lookupWord = ref("dictionary");
  const searchDrawer = ref(true);

  const autoSort = ref(false);
  const autoAnalyse = ref(false);
  const dictionarySearch = ref("");
  const hideEtymology = ref(false);
  const hideFalseFriends = ref(false);
  const hideGermanicAlternatives = ref(false);
  const hideAnglishAlternatives = ref(false);
  const hideAnglishWords = ref(false);
  const hideOtherResults = ref(false);
  const hideLetters = ref(false);

  return {
    lookupWord,
    autoSort,
    autoAnalyse,
    dictionarySearch,
    searchDrawer,
    hideEtymology,
    hideFalseFriends,
    hideGermanicAlternatives,
    hideAnglishAlternatives,
    hideAnglishWords,
    hideOtherResults,
    hideLetters,
  }
});
