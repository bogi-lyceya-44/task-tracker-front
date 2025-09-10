<script setup lang="ts">
import TopicColumn from "../TopicColumn";

import TopicCreationForm from "./TopicCreationForm/TopicCreationForm.vue";
import TopicsListSkeleton from "./TopicsListSkeleton/TopicsListSkeleton.vue";
import styles from "./topicsList.style";
import useTopicsDragAndDrop from "./useTopicsDragAndDrop.ts";

export interface Topic {
  id: string;
  name: string;
  taskIds: string[];
}

const topics = defineModel<Topic[] | null>("topics");

const { onDragStart, onDragOver } = useTopicsDragAndDrop(topics);
</script>

<template>
  <section :class="styles.topicListSection">
    <div :class="styles.topicsListWrapper">
      <div :class="styles.topicsListInner" v-if="topics">
        <TransitionGroup name="list" tag="div" :class="styles.topicsList">
          <TopicColumn
            v-for="(topic, index) in topics"
            draggable="true"
            :key="topic.id"
            :id="topic.id"
            :name="topic.name"
            :taskIds="topic.taskIds"
            :class="styles.topic"
            @dragstart="() => onDragStart(topic)"
            @dragover="() => onDragOver(topic, index)"
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

.list-leave-active {
  position: absolute;
}
</style>
