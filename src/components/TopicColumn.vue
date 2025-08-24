<script setup lang="ts">
import { ref } from "vue";

import { type TaskCardType } from "../types";

import Icon from "./Icon";
import TaskCard from "./TaskCard.vue";

defineProps<{
  name: string;
  cards: TaskCardType[];
}>();

const emit = defineEmits<{
  (e: "dragstart", event: DragEvent): void;
}>();

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
        <Icon name="more" size="1rem" />
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
      <Icon name="plus" size="1rem" />
      <span class="create-card-text">Add Card</span>
    </button>
  </div>
</template>

<style scoped>
.topic {
  width: 16em;
  min-width: 16em;
  padding: 0.5em;
  border-radius: 1em;
  background-color: var(--background-second-color);
  box-shadow: 0 2px 2px -1px #c8cce5;
}

.topic-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0.625em 0.375em;
  cursor: pointer;
  font-size: 1.125em;
  font-weight: 500;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.more-button {
  padding: 0.5em;
  border: none;
  border-radius: 0.5em;
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s;
}

.more-button:hover {
  background-color: var(--border-color);
}

.create-card-button {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.75em 1em;
  border: none;
  border-radius: 0.75em;
  margin-top: 0.625em;
  background-color: transparent;
  color: var(--primary-color);
  cursor: pointer;
  gap: 1em;
  transition: 0.3s;
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
