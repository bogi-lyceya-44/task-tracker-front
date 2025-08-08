<script lang="ts">
import { defineComponent } from "vue";
import BoardCard from "./BoardCard.vue";

export default defineComponent({
  name: "BoardsList",
  components: { BoardCard },
  data() {
    return {
      boards: [
        { id: 0, name: "board 1" },
        { id: 1, name: "board 2" },
        { id: 2, name: "board 3" },
        { id: 3, name: "board 4" },
        { id: 4, name: "board 5" },
        { id: 5, name: "board 6" },
      ],
      draggedIndex: null as number | null,
    };
  },
  methods: {
    handleDragStart(index: number) {
      this.draggedIndex = index;
    },
    handleDragOver(event: DragEvent) {
      event.preventDefault();
    },
    handleDrop(dropIndex: number) {
      if (this.draggedIndex === null || this.draggedIndex === dropIndex) return;

      const updated = [...this.boards];
      const [movedItem] = updated.splice(this.draggedIndex, 1);
      updated.splice(dropIndex, 0, movedItem);
      this.boards = updated;
      this.draggedIndex = null;
    },
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
      <div
        class="card"
        v-for="(board, index) in boards"
        :key="board.id"
        draggable="true"
        @dragstart="handleDragStart(index)"
        @dragover="handleDragOver"
        @drop="handleDrop(index)"
      >
        <BoardCard :name="board.name" />
      </div>
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
  transition: 0.5s;
}

.button__plus {
  height: 0.9em;
}

.list-move {
  transition: all 0.4s;
}
</style>
