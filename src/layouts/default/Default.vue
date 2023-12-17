<template>
  <v-app>
    <default-bar />

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'

import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';

const store = useAppStore();
const {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  anglishToEnglishDictionary,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  englishToAnglishDictionary,
} = storeToRefs(store);
</script>
