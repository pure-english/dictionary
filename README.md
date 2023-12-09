# Pure English Dictionary

## TODO

- [x] Fix duplicates of search due to second Anglish spellings
- [x] Fix duplicated search results due to search not clearing on update
- [ ] Fix mark tags not working on Anglish word definitions (I think)
- [x] Fix "No results found" showing up even when results are found via fuzzy
  search
- [ ] Fix when search results find a word, but don't include the sense that is
  highlighted, meaning it shows an unrelated entry. Like "to destroy" in
  "fell".
- [ ] Fix loading searches from URL not searching "Other Results" nor
  highlighting them
- [ ] `<mark>` tags overwhelm some definitions due to persistent definitions.
    * Mark tags spam between each letter with nothing inbetween.

Mark spam:

```
<mark></mark>s<mark></mark>i<mark></mark>z<mark></mark>e<mark></mark>,<mark></mark> <mark></mark><<mark></mark>m<mark></mark>a<mark></mark>r<mark></mark>k<mark></mark>><mark></mark>g<mark></mark>r<mark></mark>e<mark></mark>a<mark></mark>t<mark></mark><<mark></mark>/<mark></mark>m<mark></mark>a<mark></mark>r<mark></mark>k<mark></mark>><mark></mark>n<mark></mark>e<mark></mark>s<mark></mark>s<mark></mark>,<mark></mark> <mark></mark>a<mark></mark> <mark></mark>m<mark></mark>a<mark></mark>j<mark></mark>o<mark></mark>r<mark></mark>i<mark></mark>t<mark></mark>y<mark></mark>,<mark></mark> <mark></mark>t<mark></mark>h<mark></mark>e<mark></mark> <mark></mark>e<mark></mark>s<mark></mark>s<mark></mark>e<mark></mark>n<mark></mark>c<mark></mark>e<mark></mark> <mark></mark>o<mark></mark>f<mark></mark> <mark></mark>s<mark></mark>o<mark></mark>m<mark></mark>e<mark></mark>t<mark></mark>h<mark></mark>i<mark></mark>n<mark></mark>g<mark></mark> 
```

to make:

```
size, <mark>great</mark>ness, a majority, the essence of something
```

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
