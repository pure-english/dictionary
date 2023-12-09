// English to Anglish stuff

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

// Anglish to English stuff

// Difference is, there's a POS tag now
export interface AnglishToEnglishEntry {
  word: string,
  anglish_spelling: string,
  definitions: string,
  pos: string,
  forebear: string,
  taken_from: string,
  notes: string,
}

export interface AnglishWord {
  [pos: string]: Array<AnglishToEnglishEntry>,
}

export interface AnglishToEnglish {
  [word: string]: AnglishWord,
}

export interface GermanicEntry {
  [pos: string]: {
    "alternatives": string,
    "germanic_like_alternatives": string,
    "details": string,
  }
}

export interface GermanicDictionary {
  [word: string]: GermanicEntry,
}

/**
 * {
 *  "a": {
        "Preposition": [{
            "word": "a",
            "anglish_spelling": "",
            "definitions": "per",
            "pos": "Preposition",
            "forebear": "~",
            "taken_from": "NE",
            "notes": ""
        }],
        "Prefix": [{
            "word": "a",
            "anglish_spelling": "",
            "definitions": "( for verbs denotes away , out , up , on ), ( for nouns denotes in , on , at )",
            "pos": "Prefix",
            "forebear": "~",
            "taken_from": "NE",
            "notes": ""
        }]
    },
 * }
 */
