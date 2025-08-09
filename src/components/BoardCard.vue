<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoardCard",
  props: {
    id: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
  },
});
</script>

<template>
  <RouterLink class="board-link" :to="`/board/${id}`">
    <div class="board-card">
      <div class="board-card-info">
        {{ name }}
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.board-link {
  border: none !important;
  color: inherit;
}

.board-card {
  background-color: #e8eefe;
  border: 1px solid var(--border-light-color);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  height: 10em;
  justify-content: flex-end;
  padding: 0.6em;
  transition: 0.3s;
}

.board-card:hover {
  box-shadow: 0 0.4em 1em 0 var(--border-light-color);
}

.dragging > .board-card {
  border: 1px dashed #aeabb7;
}

.boards-list:has(.dragging) .board-card:hover {
  box-shadow: none;
}

.board-card-info {
  background-color: var(--background-color);
  border-radius: 0.4em;
  padding: 0.2em 0.4em;
}
</style>
