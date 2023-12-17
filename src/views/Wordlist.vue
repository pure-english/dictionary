<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <v-card
          flat
          title="Interactive Anglish Wordlist"
        >
          <template v-slot:text>
            <p>
              You can combine searching and sorting on this page.
            </p>

            <p>For example, you can search "Preposition" to get a list of all
            prepositions, and then sort by "Anglish Spelling" in order to get
            all prepositions that have a spelling attached. Likewise, you can
            also search "Norse" to get a list of all words derived from Old
            Norse, then sort by "Kind" to have the words be sorted by their
            parts of speech.</p>

            <p>You cannot, however, search in two columns at once.</p>

            <p>This wordlist automatically limits itself to 10 words at a time
            (due to processing lag), but this can be controlled at the very
            bottom with the "Items per page" dropdown selector.</p>

            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              single-line
              variant="outlined"
              hide-details
              id="wordlistSearch"
            >
            </v-text-field>
          </template>

          <!--
            :sort-by="[{ key: 'word', order: 'asc' }]" -->
            <!-- Ignore error below, it's fine -->
          <v-data-table
            :headers="headers"
            :items="anglishWordlist"
            :search="search"
            :items-per-page="10"
            multi-sort
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { Ref, onMounted, ref } from 'vue';

const store = useAppStore();
const {
  anglishWordlist
} = storeToRefs(store);

const headers = [
  {
    key: "word",
    title: "Word",
    align: "start",
  },
  {
    key: "anglish_spelling",
    title: "Anglish Spelling",
  },
  {
    key: "meaning",
    title: "Meaning",
  },
  {
    key: "kind",
    title: "Kind",
  },
  {
    key: "forebear",
    title: "Forebear",
  },
  {
    key: "taken_from",
    title: "Taken From",
  },
  {
    key: "notes",
    title: "Notes",
  },
];
let search: Ref<string> = ref("");

onMounted(() => {
  const searchBar = document.getElementById("searchBar");
  searchBar?.blur();
});
</script>

<style scoped>
p {
  margin-bottom: 10px;
}
</style>
