<template>
  <h2>{{ searchedWord }}</h2>
  <p>
    <b>Origin: </b>
    <etymology-chip :language="etymologies[searchedWord].origin"/>
  </p>
  <p v-if="etymologies[searchedWord].sub_origins.length > 1">
    <b>Sub-origins:</b>
    <span
      v-for="(sub_origin, index) in etymologies[searchedWord].sub_origins"
      :key="index"
    >
      <etymology-chip :language="sub_origin"/>
    </span>
  </p>
  <p>
    <sub>
    This etymology was sourced from Wiktionary. Be sceptical of it.
    If you must be sure, head to the "Details" tab to verify the
    information.
    </sub>
  </p>
</template>

<script setup lang="ts">
import { Etymologies } from '@/types';
import EtymologyChip from "@/components/EtymologyChip.vue";

defineProps<{
  searchedWord: string,
  etymologies: Etymologies,
}>();
</script>

<style scoped>
p {
  padding-bottom: 5px;
}

h2 {
  padding-bottom: 8px;
}
</style>
