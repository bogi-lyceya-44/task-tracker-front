<script lang="ts">
import { defineComponent, type ComponentPublicInstance } from "vue";
import BoardCard from "./BoardCard.vue";

export default defineComponent({
  name: "BoardsList",
  components: { BoardCard },
  data() {
    return {
      boards: [
        { id: 0, name: "board" },
        { id: 1, name: "board" },
        { id: 2, name: "board" },
        { id: 3, name: "board" },
        { id: 4, name: "board" },
        { id: 5, name: "board" },
      ],
      boardCardRefs: [] as HTMLElement[],
    };
  },
  mounted() {
    this.dragAndDrop();
  },
  methods: {
    setBoardCardRef(el: Element | ComponentPublicInstance | null) {
      const domEl = (el as ComponentPublicInstance)?.$el ?? el;

      if (domEl instanceof HTMLElement && !this.boardCardRefs.includes(domEl)) {
        this.boardCardRefs.push(domEl);
      }
    },

    dragAndDrop() {
      for (const board of this.boardCardRefs) {
        board.draggable = true;
        board.addEventListener("dragstart", () => {
          board.classList.add("dragging");
        });
        board.addEventListener("dragend", () => {
          board.classList.remove("dragging");
        });
      }
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
    <div class="boards-list" ref="boardsList">
      <BoardCard
        v-for="board in boards"
        :key="board.id"
        :name="board.name"
        :ref="setBoardCardRef"
      />
    </div>
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
}

.button__plus {
  height: 0.9em;
}
</style>
