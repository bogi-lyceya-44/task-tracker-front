<script lang="ts">
import { defineComponent } from "vue";

import BoardsList from "../components/BoardsList";

export default defineComponent({
  name: "HomeView",
  components: { BoardsList },
});
</script>

<template>
  <BoardsList />
</template>
