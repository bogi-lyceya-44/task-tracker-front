<script lang="ts">
import { defineComponent, ref } from "vue";

import { boardsList } from "../dataMock.ts";
import BaseIcon from "./BaseIcon.vue";
import BoardCard from "./BoardCard.vue";

interface Board {
  id: string;
  name: string;
}

export default defineComponent({
  name: "BoardsList",
  components: { BaseIcon, BoardCard },
  setup() {
    const boards = ref<Board[]>(boardsList);
    const draggedIndex = ref<number | null>(null);

    function reorder(arr: Board[], from: number, to: number): Board[] {
      const copy = [...arr];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    }

    function handleDragStart(event: DragEvent, index: number) {
      draggedIndex.value = index;

      const target = event.target as HTMLElement;
      if (!target) return;

      const dragGhost = target.cloneNode(true) as HTMLElement;
      const { width, height } = target.getBoundingClientRect();

      Object.assign(dragGhost.style, {
        height: `${height}px`,
        left: "-1000px",
        pointerEvents: "none",
        position: "absolute",
        top: "-1000px",
        width: `${width}px`,
      });

      document.body.appendChild(dragGhost);

      event.dataTransfer!.setDragImage(dragGhost, width / 2, height / 2);

      setTimeout(() => document.body.removeChild(dragGhost), 0);
    }

    function handleDragOver(index: number) {
      if (draggedIndex.value === null || draggedIndex.value === index) return;

      boards.value = reorder(boards.value, draggedIndex.value, index);
      draggedIndex.value = index;
    }

    function handleDrop() {
      draggedIndex.value = null;
    }

    function handleDragEnd() {
      draggedIndex.value = null;
    }

    return {
      boards,
      draggedIndex,
      handleDragEnd,
      handleDragOver,
      handleDragStart,
      handleDrop,
    };
  },
});
</script>

<template>
  <section class="boards-list-section">
    <div class="panel">
      <h1 class="title">Boards List</h1>
      <button class="btn">
        <BaseIcon name="plus" class="button-image" alt="plus" />
        New board
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
        @dragover.prevent="handleDragOver(index)"
        @drop="handleDrop"
        @dragend="handleDragEnd"
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
