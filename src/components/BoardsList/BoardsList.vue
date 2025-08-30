<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useDragAndDrop } from "../../composables/useDragAndDrop.ts";
import { request } from "../../utils/httpRequest.ts";
import BoardCard from "../BoardCard";
import BoardsListPanel from "../BoardsListPanel";

import styles from "./boardsList.style";

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

const maxWidth = computed(() => {
  const n = boards.value.length;
  return `calc(16em * ${n} + 1em * (${n} - 1))`;
});
</script>

<template>
  <section :class="styles.boardsListSection">
    <BoardsListPanel />
    <TransitionGroup
      name="list"
      tag="div"
      :class="styles.boardsList"
      :style="{ 'max-width': maxWidth }"
    >
      <BoardCard
        v-for="(board, index) in boards"
        :key="board.id"
        :id="board.id"
        :name="board.name"
        draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragover.prevent="onDragOverHandler(index)"
        @dragend="onDragEnd"
        :class="[styles.card, { dragging: draggedIndex === index }]"
      />
    </TransitionGroup>
  </section>
</template>

<style scoped>
/* transition groups needs  */
.list-move {
  pointer-events: none;
  transition: all 0.4s ease;
}
</style>
