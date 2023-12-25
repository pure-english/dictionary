<template>
  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="red"
    v-if="props.language === 'Latin'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="red"
    v-if="props.language === 'French'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="orange"
    v-if="props.language === 'Greek'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="orange"
    v-if="props.language === 'Norse'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="blue"
    v-if="props.language === 'Old English'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="yellow-darken-4"
    v-if="props.language === 'Unknown'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="yellow-darken-2"
    v-if="props.language === 'Mixed'"
  >
    {{ props.language }}
  </v-chip>
</template>

<script setup lang="ts">
const props = defineProps({
  language: String,
});
</script>
