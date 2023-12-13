# Pure English Dictionary

## TODO

- [x] Fix duplicates of search due to second Anglish spellings
- [x] Fix duplicated search results due to search not clearing on update
- [x] Fix mark tags not working on Anglish word definitions (I think)
- [x] Fix "No results found" showing up even when results are found via fuzzy
  search
- [x] Fix when search results find a word, but don't include the sense that is
  highlighted, meaning it shows an unrelated entry. Like "to destroy" in
  "fell".
- [x] Fix loading searches from URL not searching "Other Results" nor
  highlighting them
- [x] `<mark>` tags overwhelm some definitions due to persistent definitions.
    * Mark tags spam between each letter with nothing inbetween.
- [x] Fix no "No result" message
- [x] In the "Other Results" section, only include the meanings of words with a
  relevant definition, instead of every single definition
- [x] Word definitions need right padding
- [ ] Tell you if a word is Germanic or not
* Add to wordlist:
    - [x] Sexuality
    - [ ] Months and Holidays
- [ ] Make searches case-insensitive (easy for search a bit harder for
  definitions)
- [ ] Have a note at the start for specific exact matches
    - [ ] False friends warning -
      https://anglisc.miraheze.org/wiki/False_Friends
    - [ ] Will also display if a word is Germanic or not
- [ ] Edit "to use" words, add ones that aren't there by looking through the
  "Helpful Anglish Words" page
- [ ] Separate "exact match" and "related match" in the "Other Results"
    * Exact fuzzy match will work in the following environments: "{START}X ", "
      X{END}", " X ", ", X{SPACE/END}", "{START/SPACE}X"
- [ ] Filter out any "other results" if I've already seen any up top. This
  means that there won't be duplicates.
* Sidebar
    - [ ] Search not just definitions, but headwords (only), notes, etymologies
  (maybe list them all and make checkmarks)
    - [ ] List all words of a given Parts-of-speech

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install

# bun 
bun install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev

# bun 
bun run dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build

# bun 
bun run build
```

### Lints and fixes files

```
# yarn
yarn lint

# npm
npm run lint

# pnpm
pnpm lint

# bun 
bun run lint
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
