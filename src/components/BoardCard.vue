<script setup lang="ts">
defineProps({
  id: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
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
  border: 1px solid transparent;
  border-radius: 1em;
  box-shadow: 0 2px 2px -1px #c8cce5;
  display: flex;
  flex-direction: column;
  height: 10em;
  justify-content: flex-end;
  padding: 0.6em;
  transition: 0.3s;
}

.board-card:hover {
  box-shadow: 0 4px 6px 0 #c8cce5;
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
