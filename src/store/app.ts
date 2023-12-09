// Utilities
import { defineStore } from 'pinia'
import { AnglishToEnglish, AnglishToEnglishEntry, AnglishWord, EnglishToAnglish, GermanicDictionary, GermanicEntry } from '@/types'
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
  const englishToGermanicPath = process.env.NODE_ENV === 'production'
  ? "/dictionary/english_to_germanic.json"
  : "/english_to_germanic.json";

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

  // eslint-disable-next-line prefer-const
  let foundWord: Ref<AnglishWord> = ref({
    "POS": [],
  });

  const englishToGermanicDictionary: Ref<GermanicDictionary> = ref({
    "IGNOREME": {
      "POS": {
        alternatives: "",
        germanic_like_alternatives: "",
        details: "",
      }
    }
  });

  fetch(englishToGermanicPath).then((a) => {
    a.json().then((data: GermanicDictionary) => {
      englishToGermanicDictionary.value = data;
      console.log("Loaded EnglishToGermanic dictionary!");
    })
  });

  return {
    anglishToEnglishDictionary,
    englishToAnglishDictionary,
    emptyAnglishToEnglishEntry,
    englishToGermanicDictionary,
    foundWord,
  }
});
