<script setup lang="ts">
import { useDragAndDrop } from "../../composables/useDragAndDrop.ts";
import TopicColumn from "../TopicColumn";

import TopicCreationForm from "./TopicCreationForm/TopicCreationForm.vue";
import TopicsListSkeleton from "./TopicsListSkeleton/TopicsListSkeleton.vue";
import styles from "./topicsList.style";

interface Topic {
  id: string;
  name: string;
  taskIds: string[];
}

const topics = defineModel<Topic[] | null>("topics");

const {
  draggedIndex,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
} = useDragAndDrop<Topic>();

const onDragOverWrapper = (index: number) => {
  if (topics.value) topics.value = handleDragOver(topics.value, index);
};
</script>

<template>
  <section :class="styles.topicListSection">
    <div :class="styles.topicsListWrapper">
      <div :class="styles.topicsListInner" v-if="topics">
        <TransitionGroup name="list" tag="div" :class="styles.topicsList">
          <TopicColumn
            v-for="(topic, index) in topics"
            :key="topic.id"
            :taskIds="topic.taskIds"
            :name="topic.name"
            @dragstart="(e) => handleDragStart(e, index, 'top')"
            @dragover.prevent="() => onDragOverWrapper(index)"
            @drop="handleDrop"
            @dragend="handleDragEnd"
            :class="[styles.topic, { dragging: draggedIndex === index }]"
          />
        </TransitionGroup>
        <TopicCreationForm />
      </div>
      <TopicsListSkeleton v-else />
    </div>
  </section>
</template>

<style scoped>
/* transition groups needs  */
.list-move {
  pointer-events: none;
  transition: all 0.4s ease;
}
</style>
