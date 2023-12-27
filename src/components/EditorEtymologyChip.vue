<template>
  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="red"
    style="color: #F44336 !important;"
    v-if="props.language === 'Latin'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="red"
    style="color: #F44336 !important;"
    v-else-if="props.language === 'French'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="red"
    style="color: #F44336 !important;"
    v-else-if="props.language === 'Romance'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="orange"
    style="color: #FF9800 !important;"
    v-else-if="props.language === 'Greek'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="orange"
    style="color: #FF9800 !important;"
    v-else-if="props.language === 'Norse'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="blue"
    style="color: #2196F3 !important;"
    v-else-if="props.language === 'Old English'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="yellow-darken-4"
    style="color: #F57F17 !important;"
    v-else-if="props.language === 'Unknown'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="yellow-darken-2"
    style="color: #FBC02D !important;"
    v-else-if="props.language === 'Mixed'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="light-green-darken-1"
    style="color: #7CB342 !important;"
    v-else-if="props.language === 'German'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="green-lighten-1"
    style="color: #66BB6A !important;"
    v-else-if="props.language === 'Germanic'"
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>

  <v-chip
    label
    flat
    size="small"
    class="mx-1"
    color="yellow-darken-2"
    style="color: #FBC02D !important;"
    v-else
    @click="emitLookup()"
  >
    {{ props.word }}
  </v-chip>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/editor';
import { storeToRefs } from 'pinia';

const props = defineProps({
  word: String,
  language: String,
});

const emit = defineEmits(['lookup']);

const store = useEditorStore();
const {
  searchDrawer,
} = storeToRefs(store);

function emitLookup() {
  emit("lookup");

  if (!searchDrawer.value) {
    searchDrawer.value = true;
  }
}
</script>
