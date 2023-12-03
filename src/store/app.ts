// Utilities
import { defineStore } from 'pinia'
import { AnglishToEnglish, EnglishToAnglish } from '@/types'
import { Ref, ref } from 'vue';



// export const useAppStore = defineStore('app', {
//   state: () => ({
//     //
//   }),
// })

export const useAppStore = defineStore("app", () => {
  const anglishToEnglishDictionary: Ref<AnglishToEnglish> = ref({
    "NOT_LOADED": {
      "pos": [{
        word: "",
        anglish_spelling: "",
        definitions: "",
        pos: "",
        forebear: "",
        taken_from: "",
        notes: "",
      }]
    }
  });

  fetch("/anglish_to_english.json").then((a) => {
    a.json().then((data: AnglishToEnglish) => {
      anglishToEnglishDictionary.value = data;
      console.log("Loaded AnglishToEnglish dictionary!");
    })
  });

  const englishToAnglishDictionary: Ref<EnglishToAnglish> = ref({
    "NOT_LOADED": {
      "pos": [{
        anglish_word: "",
        anglish_spelling: "",
        definitions: "",
        forebear: "",
        taken_from: "",
        notes: "",
      }]
    }
  });

  fetch("/english_to_anglish.json").then((a) => {
    a.json().then((data: EnglishToAnglish) => {
      englishToAnglishDictionary.value = data;
      console.log("Loaded EnglishToAnglish dictionary!");
    })
  });

  return {
    anglishToEnglishDictionary,
    englishToAnglishDictionary,
  }
});
