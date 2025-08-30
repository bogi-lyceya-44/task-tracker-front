<script setup lang="ts">
import { ref, watchEffect } from "vue";

import { useDragAndDrop } from "../../composables/useDragAndDrop.ts";
import { request } from "../../utils/httpRequest.ts";
import Icon from "../BaseIcon";
import TopicColumn from "../TopicColumn";

import styles from "./topicsList.style";

interface Topic {
  id: string;
  name: string;
}

const props = defineProps<{
  topicIds: string[];
}>();

const topics = ref<Topic[]>([]);

const {
  draggedIndex,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
} = useDragAndDrop<Topic>();

function onDragOverWrapper(index: number) {
  if (topics.value) topics.value = handleDragOver(topics.value, index);
}

watchEffect(async () => {
  if (props.topicIds.length > 0) {
    topics.value = (
      await request("/get_topics", "POST", {
        ids: props.topicIds,
      })
    ).topics;
  }
  console.log(topics.value);
});
</script>

<template>
  <section :class="styles.topicListSection">
    <div :class="styles.topicsListWrapper">
      <TransitionGroup
        name="list"
        tag="div"
        :class="styles.topicsList"
        v-if="topics && topics.length !== 0"
      >
        <TopicColumn
          v-for="(topic, index) in topics"
          :key="topic.id"
          :cards="[]"
          :name="topic.name"
          @dragstart="(e) => handleDragStart(e, index, 'top')"
          @dragover.prevent="() => onDragOverWrapper(index)"
          @drop="handleDrop"
          @dragend="handleDragEnd"
          :class="[styles.topic, { dragging: draggedIndex === index }]"
        />
      </TransitionGroup>
      <button :class="styles.addTopic">
        <Icon name="plus" size="0.9em" />
        <span>Add Topic</span>
      </button>
    </div>
  </section>
</template>
