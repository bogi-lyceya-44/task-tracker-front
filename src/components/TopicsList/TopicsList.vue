<script setup lang="ts">
import { useRoute } from "vue-router";

import useDragAndDropReorder from "../../composables/useDragAndDropReorder.ts";
import type { TopicColumnType } from "../../types.ts";
import { request } from "../../utils/httpRequest.ts";
import TopicColumn from "../TopicColumn";

import TopicCreationForm from "./TopicCreationForm/TopicCreationForm.vue";
import styles from "./topicsList.style";

const topics = defineModel<TopicColumnType[] | null>("topics");

const route = useRoute();

const { onDragStart, onDragOver, onDragEnd } = useDragAndDropReorder(
  topics,
  "topic",
  "top",
);

const onDragEndExtended = () => {
  onDragEnd();

  if (topics.value) {
    const boardId = route.params.id as string;
    request("/update_boards", "POST", {
      boardsToUpdate: [
        {
          id: boardId,
          topicIds: topics.value.map((topic) => topic.id),
        },
      ],
    });
  }
};
</script>

<template>
  <section :class="styles.topicListSection">
    <div :class="styles.topicsListWrapper">
      <div :class="styles.topicsListInner">
        <TransitionGroup name="list" tag="div" :class="styles.topicsList">
          <TopicColumn
            v-for="(topic, index) in topics"
            draggable="true"
            :key="topic.id"
            :id="topic.id"
            :name="topic.name"
            :taskIds="topic.taskIds"
            :class="styles.topic"
            @dragstart="(e) => onDragStart(e, topic)"
            @dragover="() => onDragOver(topic, index)"
            @dragend="onDragEndExtended"
          />
        </TransitionGroup>
        <TopicCreationForm />
      </div>
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
