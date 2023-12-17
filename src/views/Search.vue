<template>
  <v-main class="fill-height bg-grey-lighten-3">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <SearchResult/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import SearchResult from '@/components/SearchResult.vue';
</script>
