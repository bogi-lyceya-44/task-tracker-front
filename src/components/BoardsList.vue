<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useDragAndDrop } from "../composables/useDragAndDrop.ts";
import { request } from "../utils/httpRequest.ts";

import BoardCard from "./BoardCard";
import BoardsListPanel from "./BoardsListPanel";

interface Board {
  id: string;
  name: string;
}

const boards = ref<Board[]>([]);

const { draggedIndex, handleDragStart, handleDragOver, handleDragEnd } =
  useDragAndDrop<Board>();

onMounted(async () => {
  const boardsRes = (await request("/get_all_boards", "POST", {})).boards;
  const boardsOrder = (await request("/get_board_order", "POST", {})).order;

  boards.value = [...boardsRes].sort((a, b) => {
    const orderA = boardsOrder[a.id] ?? Infinity;
    const orderB = boardsOrder[b.id] ?? Infinity;
    return orderA - orderB;
  });
});

async function onDragEnd() {
  handleDragEnd();
  const boardsPlaces = boards.value.map((board, index) => ({
    boardId: board.id,
    place: index + 1,
  }));
  await request("/change_board_order", "POST", { changes: boardsPlaces });
}

function onDragOverHandler(index: number) {
  boards.value = handleDragOver(boards.value, index);
}
</script>

<template>
  <section class="boards-list-section">
    <BoardsListPanel />
    <TransitionGroup name="list" tag="div" class="boards-list">
      <BoardCard
        v-for="(board, index) in boards"
        :key="board.id"
        :id="board.id"
        :name="board.name"
        draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragover.prevent="onDragOverHandler(index)"
        @dragend="onDragEnd"
        class="card"
        :class="{ dragging: draggedIndex === index }"
      />
    </TransitionGroup>
  </section>
</template>

<style scoped>
.boards-list-section {
  padding: 1.8em 2em;
}

.boards-list {
  display: grid;
  margin-top: 2em;
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
}

.card {
  transition: 0.3s;
}

.dragging {
  position: relative;
  overflow: hidden;
  color: var(--text-light-color);
  opacity: 0.4;
}

.list-move {
  pointer-events: none;
  transition: all 0.4s ease;
}
</style>
