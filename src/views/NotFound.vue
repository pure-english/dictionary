<template>
  <span></span>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

router.push({
  name: "NotFound",
  // preserve current path and remove the first char to avoid the target URL starting with `//`
  params: { pathMatch: route.path.substring(1).split('/') },
  // preserve existing query and hash if any
  query: route.query,
  hash: route.hash,
});
</script>
