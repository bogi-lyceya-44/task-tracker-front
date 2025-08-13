<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { type TaskCardType } from "../types";
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  name: "TopicColumn",
  components: { TaskCard },
  props: {
    ondragstart: Function,
    name: {
      required: true,
      type: String,
    },
    cards: {
      required: true,
      type: Array as PropType<TaskCardType[]>,
    },
  },
});
</script>

<template>
  <div class="topic">
    <div class="topic-top" draggable="true">
      {{ name }}
    </div>
    <div class="cards-list">
      <TaskCard v-for="card in cards" :key="card.id" :title="card.title" />
    </div>
  </div>
</template>

<style scoped>
.topic {
  background-color: var(--background-second-color);
  border-radius: 1em;
  width: 16em;
}

.topic-top {
  padding: 0.8em;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5em;
}
</style>
