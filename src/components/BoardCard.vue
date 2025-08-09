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
  <RouterLink class="board-link" to="#">
    <div class="board-card">{{ name }}</div>
  </RouterLink>
</template>

<style scoped>
.board-link {
  color: inherit;
  border: none !important;
}

.board-card {
  height: 10em;
  padding: 0.5em;
  background-color: var(--background-color);
  border: 1px solid var(--border-light-color);
  border-radius: 1em;
}

.dragging > .board-card {
  border: 1px dashed var(--border-light-color);
}
</style>
