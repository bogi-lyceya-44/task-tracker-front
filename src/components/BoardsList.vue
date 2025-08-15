<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useDragAndDrop } from "../composables/useDragAndDrop.ts";
import { request } from "../utils/httpRequest.ts";
import BaseIcon from "./BaseIcon.vue";
import BoardCard from "./BoardCard.vue";

interface Board {
  id: string;
  name: string;
}

const boards = ref<Board[]>([]);
const router = useRouter();

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

function onDragOver(index: number) {
  boards.value = handleDragOver(boards.value, index);
}

async function onCreateNewBoard() {
  const boardId = (
    await request("/create_boards", "POST", {
      boardsToCreate: [
        {
          name: "New board",
          topicIds: [],
        },
      ],
    })
  ).ids[0];
  await router.push(`/board/${boardId}`);
}
</script>

<template>
  <section class="boards-list-section">
    <div class="panel">
      <h1 class="title">Boards List</h1>
      <button class="btn" @click="onCreateNewBoard">
        <BaseIcon name="plus" class="button-image" alt="plus" /> New board
      </button>
    </div>

    <TransitionGroup name="list" tag="div" class="boards-list">
      <BoardCard
        v-for="(board, index) in boards"
        :key="board.id"
        :id="board.id"
        :name="board.name"
        draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragover.prevent="onDragOver(index)"
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

.panel {
  display: flex;
  justify-content: space-between;
}

.title {
  font-size: 2.25em;
  font-weight: 500;
  margin: 0;
}

.boards-list {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
  margin-top: 2em;
  max-width: calc(
    16em * v-bind("boards.length") + 1em * (v-bind("boards.length") - 1)
  );
}

.button-image {
  color: #fff;
  height: 0.9em;
  width: 0.9em;
}

.card {
  transition: 0.3s;
}

.dragging {
  color: var(--text-light-color);
  opacity: 0.4;
  overflow: hidden;
  position: relative;
}

.list-move {
  pointer-events: none;
  transition: all 0.4s ease;
}
</style>
