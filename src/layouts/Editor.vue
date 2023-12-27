<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <!-- Dictionary/Search -->
    <v-navigation-drawer
      v-model="searchDrawer"
      location="right"
      width="450"
    >
      <v-text-field
        label="Dictionary search"
        style="overflow: hidden;"
        v-model="dictionarySearch"
        append-inner-icon="mdi-search"
        @keydown.enter="lookupWord = dictionarySearch"
        clearable
      >
      </v-text-field>

      <!-- Emit the value from the Editor view and then send it back down here as a prop? -->
      <search-result
        is-embedded
        :hide-etymology="hideEtymology"
        :hide-false-friends="hideFalseFriends"
        :hide-germanic-alternatives="hideGermanicAlternatives"
        :hide-anglish-alternatives="hideAnglishAlternatives"
        :hide-anglish-words="hideAnglishWords"
        :hide-other-results="hideOtherResults"
        :word="lookupWord"
        class="bg-grey-lighten-3"
      />
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon>$menu</v-icon>

        <v-tooltip
          activator="parent"
          location="start"
        >
          Open Sidebar
        </v-tooltip>
      </v-app-bar-nav-icon>

      <v-app-bar-title>Anglish Editor</v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Settings -->
      <v-app-bar-nav-icon>
        <v-icon>mdi-cog</v-icon>

        <v-tooltip
          activator="parent"
          location="start"
        >
          Settings
        </v-tooltip>

        <v-dialog
          v-model="settings"
          activator="parent"
          width="auto"
        >
          <v-card style="max-width: 340px;">
            <v-card-item>
              <v-card-title>Settings</v-card-title>
            </v-card-item>

            <v-card-text>
              <p>Change these as you see fit. They will not persist between
              sessions, for now.</p>

              <v-form>
                <!--
                <v-checkbox
                  label="Auto-Analyse"
                  v-model="autoAnalyse"
                /> -->

                <v-checkbox
                  label="Auto Sort Words"
                  v-model="autoSort"
                />

                <v-checkbox
                  label="Hide Letters"
                  v-model="hideLetters"
                />

                <b>Dictionary</b>

                <v-checkbox
                  label="Hide Etymology"
                  v-model="hideEtymology"
                ></v-checkbox>

                <v-checkbox
                  label="Hide False Friends"
                  v-model="hideFalseFriends"
                ></v-checkbox>

                <v-checkbox
                  label="Hide Germanic Alternatives"
                  v-model="hideGermanicAlternatives"
                ></v-checkbox>

                <v-checkbox
                  label="Hide Anglish Alternatives"
                  v-model="hideAnglishAlternatives"
                ></v-checkbox>

                <v-checkbox
                  label="Hide Anglish Words"
                  v-model="hideAnglishWords"
                ></v-checkbox>

                <v-checkbox
                  label="Hide Other Results"
                  v-model="hideOtherResults"
                ></v-checkbox>
              </v-form>
            </v-card-text>

            <!-- <v-card-actions>
              <v-btn>
                Save permanently (TODO)
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-dialog>
      </v-app-bar-nav-icon>

      <!-- Dictionary/Search button -->
      <v-app-bar-nav-icon
        @click="searchDrawer = !searchDrawer"
      >
        <v-icon>mdi-magnify</v-icon>
        <v-tooltip
          activator="parent"
          location="start"
        >
          Open Dictionary
        </v-tooltip>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-main
      style="min-height: 300px;"
    >
      <editor/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Editor from "@/views/Editor.vue";
import SearchResult from "@/components/SearchResult.vue";
import { useEditorStore } from "@/store/editor";
import { storeToRefs } from "pinia";

const drawer = ref(true);
const settings = ref(false);

const store = useEditorStore();
const {
  lookupWord,
  autoSort,
  dictionarySearch,
  searchDrawer,
  hideEtymology,
  hideFalseFriends,
  hideGermanicAlternatives,
  hideAnglishAlternatives,
  hideAnglishWords,
  hideOtherResults,
  hideLetters,
} = storeToRefs(store);

document.title = "Anglish Editor";
</script>
