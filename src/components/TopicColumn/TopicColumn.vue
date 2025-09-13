<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import { useDragState } from "../../composables/useDragState.ts";
import type { TaskCardType, TopicColumnType } from "../../types.ts";
import { request } from "../../utils/httpRequest.ts";
import Icon from "../BaseIcon";
import TaskCard from "../TaskCard";

import styles from "./topicColumn.style";
import useTasksDragAndDrop from "./useTasksDragAndDrop.ts";

defineOptions({ inheritAttrs: false });

const props = defineProps<TopicColumnType>();

const emit = defineEmits(["dragstart", "dragover", "dragend"]);

const tasks = ref<TaskCardType[]>([]);
const needsSync = ref(false);

const {
  tasksPreview,
  onTaskDragStart,
  onTaskDragOverTask,
  onTopicDragOver,
  onDrop,
  onDragEnd,
} = useTasksDragAndDrop(tasks.value);

onMounted(() => {
  if (props.taskIds.length === 0) tasks.value = [];
  else {
    request("/get_tasks", "POST", { ids: props.taskIds }).then((res) => {
      tasks.value = res.tasks;
      tasksPreview.value = res.tasks;
    });
  }
});

const dragState = useDragState();

const onDragOver = () => {
  const dragEntity = dragState.draggedEntity.value;
  if (dragEntity?.type === "task") {
    onTopicDragOver();
  }
  if (dragEntity?.type === "topic") {
    emit("dragover");
  }
};

const cardDragOver = (task: TaskCardType, pos: number) => {
  const dragEntity = dragState.draggedEntity.value;
  onTaskDragOverTask(task, pos);
  if (dragEntity?.type === "topic") {
    emit("dragover");
  }
};

watch(tasksPreview, (newTasks) => {
  if (tasks.value.length !== newTasks.length) {
    needsSync.value = true;
    return;
  }

  for (let i = 0; i < newTasks.length; i++) {
    if (tasks.value[i].id !== newTasks[i].id) {
      needsSync.value = true;
      return;
    }
  }

  needsSync.value = false;
});

watch(
  () => dragState.draggedEntity.value,
  (entity) => {
    if (!entity && needsSync.value) {
      needsSync.value = false;
      request("/update_topics", "POST", {
        topicsToUpdate: [
          { id: props.id, taskIds: tasksPreview.value.map((t) => t.id) },
        ],
      }).then(() => {
        tasks.value = tasksPreview.value;
      });
    }
  },
);
</script>

<template>
  <div
    :class="[styles.topicWrapper, $attrs.class]"
    @dragover.stop.prevent="onDragOver"
    @drop.prevent="onDrop"
  >
    <div
      :class="styles.topic"
      :draggable="!!$attrs.draggable"
      @dragstart.stop="(e) => emit('dragstart', e)"
      @dragend.stop="(e) => emit('dragend', e)"
    >
      <div :class="styles.topicTop">
        {{ props.name }}
        <button :class="styles.moreButton">
          <Icon name="more" size="1rem" />
        </button>
      </div>
      <div :class="styles.cardsWrapper">
        <!--        <div v-if="tasksPreview.length === 0">asd</div>-->
        <TransitionGroup
          name="list"
          tag="div"
          :class="styles.cardsList"
          @dragover.stop
        >
          <div
            v-for="(task, index) in tasksPreview"
            :key="task.id"
            :class="styles.cardWrapper"
            @dragover.prevent.stop="() => cardDragOver(task, index)"
          >
            <TaskCard
              :title="task.name"
              :description="task.description"
              draggable="true"
              @dragstart.stop="() => onTaskDragStart(task)"
              @drop.prevent.stop="onDrop"
              @dragend="onDragEnd"
            />
          </div>
        </TransitionGroup>
      </div>
      <button :class="styles.createCardButton">
        <Icon name="plus" size="1rem" />
        <span :class="styles.createCardText">Add Card</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* transition groups needs  */
.list-move {
  pointer-events: none;
  transition: all 0.26s ease;
}

.list-leave-to {
  transition: all 0s;
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
