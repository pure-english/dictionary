// Utilities
import { defineStore } from 'pinia'
import { AnglishToEnglish, AnglishToEnglishEntry, AnglishWord, AnglishWordlist, EnglishToAnglish, Etymologies, GermanicDictionary } from '@/types'
import { Ref, ref } from 'vue';

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
  const anglishWordlistPath = process.env.NODE_ENV === 'production'
  ? "/dictionary/anglish_wordlist.json"
  : "/anglish_wordlist.json";
  const etymologyPath = process.env.NODE_ENV === 'production'
  ? "/dictionary/etymologies.json"
  : "/etymologies.json";

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
        is_anglish: false,
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
    is_anglish: false,
  }

  // eslint-disable-next-line prefer-const
  let foundWord: Ref<AnglishWord> = ref({
    "POS": [],
  });

  const englishToGermanicDictionary: Ref<GermanicDictionary> = ref({
    "IGNOREME": {
      "POS": []
    }
  });

  fetch(englishToGermanicPath).then((a) => {
    a.json().then((data: GermanicDictionary) => {
      englishToGermanicDictionary.value = data;
      console.log("Loaded EnglishToGermanic dictionary!");
    })
  });

  const anglishWordlist: Ref<AnglishWordlist> = ref([]);

  fetch(anglishWordlistPath).then((a) => {
    a.json().then((data: AnglishWordlist) => {
      anglishWordlist.value = data;
      console.log("Loaded Anglish Wordlist!");
    })
  });

  const etymologies: Ref<Etymologies> = ref({});

  fetch(etymologyPath).then((a) => {
    a.json().then((data: Etymologies) => {
      etymologies.value = data;
      console.log("Loaded Etymologies!");
    })
  });

  return {
    anglishToEnglishDictionary,
    englishToAnglishDictionary,
    emptyAnglishToEnglishEntry,
    englishToGermanicDictionary,
    anglishWordlist,
    etymologies,
    foundWord,
  }
});
