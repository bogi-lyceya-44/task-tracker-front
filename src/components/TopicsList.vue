<script setup lang="ts">
import { ref } from "vue";

import { topicsList } from "../dataMock.ts";
import type { TaskCardType } from "../types.ts";
import BaseIcon from "./BaseIcon.vue";
import DraggableComponent from "./DraggableComponent.vue";
import TopicColumn from "./TopicColumn.vue";

interface Topic {
  id: string;
  name: string;
  cards: TaskCardType[];
}

const topics = ref<Topic[]>(topicsList);

function onAfterDragOver(newList: Topic[]) {
  topics.value = newList;
}
</script>

<template>
  <section class="topics-list-section">
    <div class="topics-list-wrapper">
      <TransitionGroup name="list" tag="div" class="topics-list">
        <DraggableComponent
          v-for="(topic, index) in topics"
          :key="topic.id"
          :full-list="topics"
          :index="index"
          :on-after-drag-over="onAfterDragOver"
          pos="top"
        >
          <TopicColumn
            :cards="topic.cards"
            :name="topic.name"
            class="topic"
          />
        </DraggableComponent>
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
  display: flex;
  flex: 1;
  padding: 0 2em 1.8em;
}

.topics-list-wrapper {
  display: flex;
  flex: 1;
  gap: 2em;
  min-height: 100%;
  overflow-x: scroll;
  padding-bottom: 1em;
}

.topics-list {
  display: flex;
  gap: 2em;
}

.topic {
  height: fit-content;
  transition: 0.3s;
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
  min-width: 10em;
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
