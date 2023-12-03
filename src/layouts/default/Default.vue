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
  anglishToEnglishDictionary,
  englishToAnglishDictionary,
} = storeToRefs(store);
</script>
