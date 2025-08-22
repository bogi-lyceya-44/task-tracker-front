<script setup lang="ts">
import { onMounted, ref } from "vue";

import { request } from "../utils/httpRequest.ts";
import BoardCard from "./BoardCard.vue";
import BoardsListPanel from "./BoardsListPanel.vue";
import DraggableComponent from "./DraggableComponent.vue";

interface Board {
  id: string;
  name: string;
}

const boards = ref<Board[]>([]);

onMounted(async () => {
  const boardsRes = (await request("/get_all_boards", "POST", {})).boards;
  const boardsOrder = (await request("/get_board_order", "POST", {})).order;

  boards.value = [...boardsRes].sort((a, b) => {
    const orderA = boardsOrder[a.id] ?? Infinity;
    const orderB = boardsOrder[b.id] ?? Infinity;
    return orderA - orderB;
  });
});

async function afterDragEnd() {
  const boardsPlaces = boards.value.map((board, index) => ({
    boardId: board.id,
    place: index + 1,
  }));
  await request("/change_board_order", "POST", { changes: boardsPlaces });
}

function afterDragOver(newList: Board[]) {
  boards.value = newList;
}
</script>

<template>
  <section class="boards-list-section">
    <BoardsListPanel />
    <TransitionGroup name="list" tag="div" class="boards-list">
      <DraggableComponent
        v-for="(board, index) of boards"
        :key="board.id"
        :full-list="boards"
        :index="index"
        :on-after-drag-end="afterDragEnd"
        :on-after-drag-over="afterDragOver"
      >
        <BoardCard
          :id="board.id"
          :name="board.name"
          class="card"
        />
      </DraggableComponent>
    </TransitionGroup>
  </section>
</template>

<style scoped>
.boards-list-section {
  padding: 1.8em 2em;
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

.card {
  transition: 0.3s;
}
</style>
