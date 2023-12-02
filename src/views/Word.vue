<template>
  <!-- <h1>Word Definition</h1>
  <p>Your word is '{{ $route.params.word }}'</p> -->

  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="2"
        >
          <v-sheet
            rounded="lg"
            min-height="268"
          >
            <!-- Definition stuff -->
            Sheet 1
          </v-sheet>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-sheet
            min-height="70vh"
            rounded="lg"
          >
            Sheet 2
          </v-sheet>
        </v-col>

        <v-col
          cols="12"
          md="2"
        >
          <v-sheet
            rounded="lg"
            min-height="268"
          >
            Sheet 3
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">

</script>
