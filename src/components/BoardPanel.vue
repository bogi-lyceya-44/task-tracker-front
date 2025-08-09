<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoardPanel",
  props: {
    name: {
      required: true,
      type: String,
    },
  },
});
</script>

<template>
  <section class="board-panel-section">
    <div class="board-panel">
      <h1 class="title">{{ name }}</h1>
    </div>
  </section>
</template>

<style scoped>
.board-panel-section {
  padding: 1.8em 2em;
}

.board-panel {
  align-items: center;
  background-color: var(--background-color);
  border-radius: 1em;
  display: flex;
  justify-content: space-between;
  padding: 1.2em;
}

.title {
  font-size: 1.6em;
  font-weight: 400;
  margin: 0;
}
</style>
