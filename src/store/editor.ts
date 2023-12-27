import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export const useEditorStore = defineStore("editor", () => {
  const autoAnalyse = ref(false);

  return {
    autoAnalyse,
  }
});
