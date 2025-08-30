<script setup lang="ts">
import { ref } from "vue";

import { type TaskCardType } from "../../types.ts";
import Icon from "../BaseIcon";
import TaskCard from "../TaskCard";

import styles from "./topicColumn.style";

const emit = defineEmits<{
  (e: "dragstart", event: DragEvent): void;
}>();

const props = defineProps<{
  name: string;
  cards: TaskCardType[];
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
    :class="styles.topic"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent
  >
    <div
      :class="styles.topicTop"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      {{ props.name }}
      <button :class="styles.moreButton">
        <Icon name="more" size="1rem" />
      </button>
    </div>
    <div :class="styles.cardsList">
      <TaskCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        draggable="true"
      />
    </div>
    <button :class="styles.createCardButton">
      <Icon name="plus" size="1rem" />
      <span :class="styles.createCardText">Add Card</span>
    </button>
  </div>
</template>
