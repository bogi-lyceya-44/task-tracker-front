<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { TaskCardType } from "../../types.ts";
import { request } from "../../utils/httpRequest.ts";
import Icon from "../BaseIcon";
import TaskCard from "../TaskCard";

import styles from "./topicColumn.style";

const emit = defineEmits<{
  (e: "dragstart", event: DragEvent): void;
}>();

const props = defineProps<{
  name: string;
  taskIds: string[];
}>();

const tasks = ref<TaskCardType[]>([]);

onMounted(() => {
  if (props.taskIds.length === 0) tasks.value = [];
  else
    request("/get_tasks", "POST", { ids: props.taskIds }).then((res) => {
      tasks.value = res.tasks;
    });
});

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
        v-for="task in tasks"
        :key="task.id"
        :title="task.name"
        :description="task.description"
        draggable="true"
      />
    </div>
    <button :class="styles.createCardButton">
      <Icon name="plus" size="1rem" />
      <span :class="styles.createCardText">Add Card</span>
    </button>
  </div>
</template>
