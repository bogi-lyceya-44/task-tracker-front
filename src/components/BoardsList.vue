<script lang="ts">
import { defineComponent, ref } from "vue";
import BoardCard from "./BoardCard.vue";

interface Board {
  id: number;
  name: string;
}

export default defineComponent({
  name: "BoardsList",
  components: { BoardCard },
  setup() {
    const boards = ref<Board[]>([
      { id: 0, name: "board 1" },
      { id: 1, name: "board 2" },
      { id: 2, name: "board 3" },
      { id: 3, name: "board 4" },
      { id: 4, name: "board 5" },
      { id: 5, name: "board 6" },
    ]);

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
        position: "absolute",
        top: "-1000px",
        left: "-1000px",
        pointerEvents: "none",
        width: `${width}px`,
        height: `${height}px`,
      });

      document.body.appendChild(dragGhost);

      event.dataTransfer!.setDragImage(dragGhost, width / 2, height / 2);

      setTimeout(() => document.body.removeChild(dragGhost), 0);
    }

    function handleDragOver(event: DragEvent, index: number) {
      event.preventDefault();
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
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
    };
  },
});
</script>

<template>
  <section class="boards-list-section">
    <div class="panel">
      <h1 class="title">Boards List</h1>
      <button class="btn">
        <img class="button__plus" src="../assets/icons/plus.svg" alt="plus" />
        New board
      </button>
    </div>
    <TransitionGroup name="list" tag="div" class="boards-list">
      <BoardCard
        v-for="(board, index) in boards"
        :key="board.id"
        draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragover.prevent="handleDragOver($event, index)"
        @drop="handleDrop"
        @dragend="handleDragEnd"
        :name="board.name"
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
  margin: 0;
  font-size: 2.25em;
  font-weight: 500;
}

.boards-list {
  max-width: calc(
    16em * v-bind("boards.length") + 1em * (v-bind("boards.length") - 1)
  );
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
  gap: 1em;
  transition: 0.4s;
}

.button__plus {
  height: 0.9em;
}

.card {
  transition: 0.3s;
}

.dragging {
  position: relative;
  overflow: hidden;
  color: var(--text-light-color);
  opacity: 0.8;
}

.list-move {
  pointer-events: none;
  transition: all 0.4s;
}
</style>
