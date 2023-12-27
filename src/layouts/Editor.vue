<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="searchDrawer"
      location="right"
      width="450"
    >
      <!-- Emit the value from the Editor view and then send it back down here as a prop? -->
      <search-result
        is-embedded
        word="realize"
        class="bg-grey-lighten-3"
      />
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-app-bar-title>Anglish Editor</v-app-bar-title>

      <v-spacer></v-spacer>
<!--
        @click="settings = !settings" -->
      <v-app-bar-nav-icon
        icon="mdi-cog"
      >
        <v-dialog
          v-model="settings"
          activator="parent"
          width="auto"
        >
          <v-card>
            <v-card-item>
              <v-card-title>Settings</v-card-title>
            </v-card-item>

            <v-card-text>
              Here are where your settings will be.
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-app-bar-nav-icon>

      <v-app-bar-nav-icon
        @click="searchDrawer = !searchDrawer"
        icon="mdi-magnify"
      />
    </v-app-bar>

    <!-- Flex 'align-center' puts it vertically central -->
    <!--
      class="d-flex justify-center flex-grow-1" -->
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

const drawer = ref(true);
const searchDrawer = ref(true);
const settings = ref(false);
</script>
