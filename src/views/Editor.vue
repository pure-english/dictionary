<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-textarea
          variant="outlined"
          counter
        >

        </v-textarea>
      </v-col>
    </v-row>

    <v-row justify="center" style="margin: auto;">
      <v-col>
        <div class="d-flex align-center justify-center w-100 h-100">
          <v-btn
            @click="analyse()"
          >
            Analyse
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <!-- <div class="d-flex align-center justify-center w-100 h-100"> -->
          <v-checkbox label="Auto-Analyse"></v-checkbox>
        <!-- </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
function analyse() {
  console.log("Analysing input…");
}
</script>
