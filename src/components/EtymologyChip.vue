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
    v-else-if="props.language === 'French'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="red"
    v-else-if="props.language === 'Romance'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="orange"
    v-else-if="props.language === 'Greek'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="orange"
    v-else-if="props.language === 'Norse'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="blue"
    v-else-if="props.language === 'Old English'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="yellow-darken-4"
    v-else-if="props.language === 'Unknown'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="yellow-darken-2"
    v-else-if="props.language === 'Mixed'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="light-green-darken-1"
    v-else-if="props.language === 'German'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="green-lighten-1"
    v-else-if="props.language === 'Germanic'"
  >
    {{ props.language }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="yellow-darken-2"
    v-else
  >
    Other
  </v-chip>
</template>

<script setup lang="ts">
const props = defineProps({
  language: String,
});
</script>
