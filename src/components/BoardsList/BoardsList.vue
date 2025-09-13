<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import useDragAndDropReorder from "../../composables/useDragAndDropReorder.ts";
import type { BoardCardType } from "../../types.ts";
import { request } from "../../utils/httpRequest.ts";
import BoardCard from "../BoardCard";
import BoardsListPanel from "../BoardsListPanel";

import styles from "./boardsList.style";

const boards = ref<BoardCardType[]>([]);

const { onDragStart, onDragOver, onDragEnd } = useDragAndDropReorder(
  boards,
  "board",
);

const onDragEndExtended = () => {
  onDragEnd();
  request("/change_board_order", "POST", {
    changes: boards.value.map((board, index) => ({
      boardId: board.id,
      place: index + 1,
    })),
  }).then((res) => console.log(res));
};

onMounted(async () => {
  const boardsRes = (await request("/get_all_boards", "POST", {})).boards;
  const boardsOrder = (await request("/get_board_order", "POST", {})).order;

  boards.value = [...boardsRes].sort((a, b) => {
    const orderA = boardsOrder[a.id] ?? Infinity;
    const orderB = boardsOrder[b.id] ?? Infinity;
    return orderA - orderB;
  });
});

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
        v-for="(board, index) of boards"
        draggable="true"
        :key="board.id"
        :id="board.id"
        :name="board.name"
        @dragstart="() => onDragStart(board)"
        @dragover="() => onDragOver(board, index)"
        @dragend="onDragEndExtended"
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
