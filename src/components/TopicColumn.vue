<script lang="ts">
import { defineComponent, type PropType, ref } from "vue";

import { type TaskCardType } from "../types";
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  name: "TopicColumn",
  components: { TaskCard },
  props: {
    name: { required: true, type: String },
    cards: { required: true, type: Array as PropType<TaskCardType[]> },
  },
  emits: ["dragstart"],
  setup(_, { emit }) {
    const allowDrag = ref(false);

    function onMouseDown() {
      allowDrag.value = true;
    }
    function onMouseUp() {
      allowDrag.value = false;
    }
    function onMouseLeave() {
      allowDrag.value = false;
    }
    function onDragStart(event: DragEvent) {
      if (!allowDrag.value) {
        event.preventDefault();
        return;
      }
      emit("dragstart", event);
    }

    return {
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onDragStart,
    };
  },
});
</script>

<template>
  <div
    class="topic"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent
  >
    <div
      class="topic-top"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      {{ name }}
    </div>
    <div class="cards-list">
      <TaskCard
          v-for="card in cards"
          :key="card.id"
          :title="card.title"
          draggable="true"
      />
    </div>
  </div>
</template>

<style scoped>
.topic {
  background-color: var(--background-second-color);
  border-radius: 1em;
  width: 16em;
}

.topic-top {
  cursor: pointer;
  padding: 0.8em;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.5em 0.5em;
}
</style>
