<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoardCard",
  props: ["name"],
});
</script>

<template>
  <RouterLink class="board-link" to="#">
    <div class="board-card">card</div>
  </RouterLink>
</template>

<style scoped>
.board-card {
  height: 10em;
  padding: 0.5em;
  border: 1px solid var(--border-light-color);
  border-radius: 1em;
}

.board-link {
  border-radius: 1em;
  color: var(--text-color);
}
</style>
