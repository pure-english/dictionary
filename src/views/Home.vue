<template>
  <br/>
  <br/>
  <center>
    <h3>Welcome to the Online Anglish Dictionary!</h3>

    <p>Search a term to get started.</p>

    <p>
      <b>How to Use</b>
      <ul>
        <li>Search an English or Anglish term to get results.</li>
        <li>The search is autofocused, so you can type away.</li>
      </ul>
    </p>

    <p>
      <b>Shortcuts</b>
      <ul>
        <li>To unfocus the search bar, press the <b>Escape</b> key.</li>
        <li>To refocus on the search bar, press '<b>s</b>' for "search".</li>
        <li>To scroll to the top, press '<b>u</b>' for "up".</li>
        <li>To scroll to the bottom, press '<b>d</b>' for "down".</li>
      </ul>
    </p>

    <p>
      <b>Other links</b>
      <ul>
        <li>
          <router-link to="./editor/">Anglish Editor</router-link> (for live editing)
        </li>
        <li>
          <router-link to="./list/">Interactive Wordlist</router-link> (for sorting and filtering)
        </li>
        <li>
          <a href="https://pure-english.github.io/name-generator/" target="_blank">
            Anglish Name Generator
          </a> (generating names)
        </li>
      </ul>
    </p>

    <p>
      <b>Credits</b>
      <ul>
        <li>
          <a href="https://anglisc.miraheze.org/wiki/Anglish_Wordbook">
            Anglish Wordbook
          </a>
        </li>
        <li>
          <a href="https://docs.google.com/spreadsheets/d/1nf_aF_hmDQnYyiwJbGdX4kdwIST_VUziRqXp0AfE2Yk/edit#gid=0">
            Germanic Thesaurus
          </a>
        </li>
      </ul>
    </p>

    <p><sub>This project is still in progress, expect errors.</sub></p>

    <p><sub>v1.9.0 (2023-12-26)</sub></p>
  </center>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
  const searchBar = document.getElementById("searchBar");
  window.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && (document.activeElement === searchBar)) {
      searchBar?.blur();
    }
  });
});
</script>

<style scoped>
p {
  padding-bottom: 8px;
}
</style>
