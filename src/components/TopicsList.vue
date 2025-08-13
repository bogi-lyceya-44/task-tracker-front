<script lang="ts">
import { defineComponent, ref } from "vue";

import {useDragAndDrop} from "../composables/useDragAndDrop.ts";
import { topicsList } from "../dataMock.ts";
import type { TaskCardType } from "../types.ts";
import BaseIcon from "./BaseIcon.vue";
import TopicColumn from "./TopicColumn.vue";

interface Topic {
  id: string;
  name: string;
  cards: TaskCardType[];
}

export default defineComponent({
  name: "TopicsList",
  components: {BaseIcon, TopicColumn },
  setup() {
    const topics = ref<Topic[]>(topicsList);
    const {
      draggedIndex,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
    } = useDragAndDrop<Topic>();

    function onDragOver(index: number) {
      topics.value = handleDragOver(topics.value, index);
    }

    return {
      topics,
      draggedIndex,
      handleDragStart,
      onDragOver,
      handleDrop,
      handleDragEnd,
    };
  },
});
</script>

<template>
  <section class="topics-list-section">
    <div class="topics-list-wrapper">
      <TransitionGroup name="list" tag="div" class="topics-list">
        <TopicColumn
          v-for="(topic, index) in topics"
          :key="topic.id"
          :cards="topic.cards"
          :name="topic.name"
          @dragstart="handleDragStart($event, index)"
          @dragover.prevent="onDragOver(index)"
          @drop="handleDrop"
          @dragend="handleDragEnd"
          class="topic"
          :class="{ dragging: draggedIndex === index }"
        />
      </TransitionGroup>
      <button class="add-topic">
        <BaseIcon class="add-topic-icon" name="plus" alt="" />
        <span>Add Topic</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.topics-list-section {
  padding: 0 2em 1.8em;
}

.topics-list-wrapper {
  display: flex;
  gap: 2em;
}

.topics-list {
  display: flex;
  gap: 2em;
}

.topic {
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

.add-topic {
  align-items: center;
  background-color: var(--background-color);
  border: none;
  border-radius: 1em;
  cursor: pointer;
  display: flex;
  font-size: 1em;
  gap: 0.8em;
  height: fit-content;
  padding: 0.6em 0.8em;
  transition: 0.3s;
  width: 16em;
}

.add-topic:hover {
  background-color: var(--background-second-color);
}

.add-topic-icon {
  height: 0.9em;
  width: 0.9em;
}
</style>
