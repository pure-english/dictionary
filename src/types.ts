// A single Anglish word
export interface AnglishEntry {
  anglish_word: string,
  anglish_spelling: string,
  definitions: string,
  forebear: string,
  taken_from: string,
  notes: string,
}

// A single English word's alternatives
export interface EnglishWord {
  [pos: string]: Array<AnglishEntry>,
}

// JSON interface
export interface EnglishToAnglish {
  [word: string]: EnglishWord,
}

// "per": {
//   "Preposition": [{
//       "anglish_word": "a",
//       "anglish_spelling": "",
//       "definitions": "per",
//       "forebear": "~",
//       "taken_from": "NE",
//       "notes": ""
//   }]
// },
