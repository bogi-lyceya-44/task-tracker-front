<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoardCard",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="board-card">{{ name }}</div>
</template>

<style scoped>
.board-card {
  height: 10em;
  padding: 0.5em;
  border: 1px solid var(--border-light-color);
  border-radius: 1em;
}
</style>
