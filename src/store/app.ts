// Utilities
import { defineStore } from 'pinia'
import { AnglishToEnglish, AnglishToEnglishEntry, EnglishToAnglish } from '@/types'
import { Ref, ref } from 'vue';



// export const useAppStore = defineStore('app', {
//   state: () => ({
//     //
//   }),
// })

export const useAppStore = defineStore("app", () => {
  const anglishToEnglishPath = process.env.NODE_ENV === 'production'
    ? "/dictionary/anglish_to_english.json"
    : "/anglish_to_english.json";
  const englishToAnglishPath = process.env.NODE_ENV === 'production'
    ? "/dictionary/english_to_anglish.json"
    : "/english_to_anglish.json";

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

  fetch(anglishToEnglishPath).then((a) => {
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

  fetch(englishToAnglishPath).then((a) => {
    a.json().then((data: EnglishToAnglish) => {
      englishToAnglishDictionary.value = data;
      console.log("Loaded EnglishToAnglish dictionary!");
    })
  });

  const emptyAnglishToEnglishEntry: AnglishToEnglishEntry = {
    word: "",
    anglish_spelling: "",
    definitions: "",
    pos: "",
    forebear: "",
    taken_from: "",
    notes: "",
  }

  return {
    anglishToEnglishDictionary,
    englishToAnglishDictionary,
    emptyAnglishToEnglishEntry,
  }
});
