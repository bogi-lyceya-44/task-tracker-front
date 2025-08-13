<script lang="ts">
import { defineComponent, ref } from "vue";

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
  components: { BaseIcon, TopicColumn },
  setup() {
    const topics = ref<Topic[]>(topicsList);
    const draggedIndex = ref<number | null>(null);

    function reorder(arr: Topic[], from: number, to: number): Topic[] {
      const copy = [...arr];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    }

    function handleDragStart(event: DragEvent, index: number) {
      draggedIndex.value = index;

      const target = event.currentTarget as HTMLElement;
      const dragGhost = target.cloneNode(true) as HTMLElement;
      const { width, height } = target.getBoundingClientRect();

      Object.assign(dragGhost.style, {
        height: `${height}px`,
        width: `${width}px`,
        left: "-1000px",
        top: "-1000px",
        position: "absolute",
        pointerEvents: "none",
        zIndex: "9999",
      });

      document.body.appendChild(dragGhost);

      event.dataTransfer!.setDragImage(dragGhost, width / 2, 20);

      setTimeout(() => document.body.removeChild(dragGhost), 0);
    }

    function handleDragOver(index: number) {
      if (draggedIndex.value === null || draggedIndex.value === index) return;

      topics.value = reorder(topics.value, draggedIndex.value, index);
      draggedIndex.value = index;
    }

    function handleDrop() {
      draggedIndex.value = null;
    }

    function handleDragEnd() {
      draggedIndex.value = null;
    }

    return {
      topics,
      draggedIndex,
      handleDragStart,
      handleDragOver,
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
          @dragover.prevent="handleDragOver(index)"
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
