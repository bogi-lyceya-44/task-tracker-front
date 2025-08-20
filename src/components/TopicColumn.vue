<script setup lang="ts">
import { ref } from "vue";

import { type TaskCardType } from "../types";
import BaseIcon from "./BaseIcon.vue";
import TaskCard from "./TaskCard.vue";

// 🔹 props
defineProps<{
  name: string;
  cards: TaskCardType[];
}>();

// 🔹 emits
const emit = defineEmits<{
  (e: "dragstart", event: DragEvent): void;
}>();

// 🔹 state
const allowDrag = ref(false);

// 🔹 methods
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
      <button class="more-button">
        <BaseIcon name="more" height="16px" width="16px" />
      </button>
    </div>
    <div class="cards-list">
      <TaskCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        draggable="true"
      />
    </div>
    <button class="create-card-button">
      <BaseIcon name="plus" height="16px" width="16px" />
      <span class="create-card-text">Add Card</span>
    </button>
  </div>
</template>

<style scoped>
.topic {
  background-color: var(--background-second-color);
  border-radius: 1em;
  box-shadow: 0 2px 2px -1px #c8cce5;
  min-width: 16em;
  padding: 0.5em;
  width: 16em;
}

.topic-top {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 1.125em;
  font-weight: 500;
  justify-content: space-between;
  padding: 0 0 0.625em 0.375em;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.more-button {
  background-color: transparent;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
  padding: 0.5em;
  transition: 0.3s;
}

.more-button:hover {
  background-color: var(--border-color);
}

.create-card-button {
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 0.75em;
  color: var(--primary-color);
  cursor: pointer;
  display: flex;
  gap: 1em;
  margin-top: 0.625em;
  padding: 0.75em 1em;
  transition: 0.3s;
  width: 100%;
}

.create-card-text {
  font-size: 1.2em;
  font-weight: 500;
  line-height: 16px;
}

.create-card-button:hover {
  background-color: var(--primary-second-hover-color);
}
</style>
