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
