<script lang="ts">
import { defineComponent, ref } from "vue";

import { useDragAndDrop } from "../composables/useDragAndDrop.ts";
import { topicsList } from "../dataMock.ts";
import type { TaskCardType } from "../types.ts";

import Icon from "./Icon";
import TopicColumn from "./TopicColumn.vue";

interface Topic {
  cards: TaskCardType[];
  id: string;
  name: string;
}

export default defineComponent({
  name: "TopicsList",
  components: { Icon, TopicColumn },
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
          @dragstart="handleDragStart($event, index, 'top')"
          @dragover.prevent="onDragOver(index)"
          @drop="handleDrop"
          @dragend="handleDragEnd"
          class="topic"
          :class="{ dragging: draggedIndex === index }"
        />
      </TransitionGroup>
      <button class="add-topic">
        <Icon name="plus" size="0.9em" />
        <span>Add Topic</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.topics-list-section {
  display: flex;
  flex: 1;
  padding: 0 2em 1.8em;
}

.topics-list-wrapper {
  display: flex;
  min-height: 100%;
  flex: 1;
  padding-bottom: 1em;
  gap: 2em;
  overflow-x: scroll;
}

.topics-list {
  display: flex;
  gap: 2em;
}

.topic {
  height: fit-content;
  transition: 0.3s;
}

.dragging {
  position: relative;
  overflow: hidden;
  color: var(--text-light-color);
  opacity: 0.4;
}

.list-move {
  pointer-events: none;
  transition: all 0.4s ease;
}

.add-topic {
  display: flex;
  width: 16em;
  min-width: 10em;
  height: fit-content;
  align-items: center;
  padding: 0.6em 0.8em;
  border: none;
  border-radius: 1em;
  background-color: var(--background-color);
  cursor: pointer;
  font-size: 1em;
  gap: 0.8em;
  transition: 0.3s;
}

.add-topic:hover {
  background-color: var(--background-second-color);
}
</style>
