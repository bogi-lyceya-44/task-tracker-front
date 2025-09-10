import { ref } from "vue";

import { useDragState } from "../../composables/useDragState.ts";
import type { TaskCardType } from "../../types.ts";

const { draggedEntity, afterDragOut } = useDragState();

const useTasksDragAndDrop = (tasks: TaskCardType[]) => {
  const tasksPreview = ref<TaskCardType[]>(tasks);

  const onTaskDragStart = (task: TaskCardType) => {
    draggedEntity.value = { type: "task", entity: task };
    afterDragOut.value = () => onDragOut(task.id);
  };

  const onDragOut = (taskId: string) => {
    tasksPreview.value = tasksPreview.value.filter(
      (task) => task.id !== taskId,
    );
  };

  const onTaskDragOverTask = (task: TaskCardType, pos: number) => {
    const dragEntity = draggedEntity.value;

    if (task.id === draggedEntity.value?.entity.id) return;

    if (dragEntity?.type === "task") {
      if (afterDragOut.value) afterDragOut.value();

      tasksPreview.value = [
        ...tasksPreview.value.slice(0, pos),
        dragEntity.entity,
        ...tasksPreview.value.slice(pos),
      ];
      afterDragOut.value = () => onDragOut(dragEntity.entity.id);
    }
  };

  const onTopicDragOver = () => {
    const dragEntity = draggedEntity.value;
    if (dragEntity?.type === "task") {
      if (afterDragOut.value) afterDragOut.value();

      if (
        !tasksPreview.value[tasksPreview.value.length - 1] ||
        tasksPreview.value[tasksPreview.value.length - 1].id !==
          dragEntity.entity.id
      ) {
        tasksPreview.value = [...tasksPreview.value, dragEntity.entity];
        afterDragOut.value = () => onDragOut(dragEntity.entity.id);
      }
    }
  };

  const onDrop = () => {
    draggedEntity.value = null;
    afterDragOut.value = null;
  };

  const onDragEnd = () => {
    draggedEntity.value = null;
    afterDragOut.value = null;
  };

  return {
    tasksPreview,
    onTaskDragStart,
    onTaskDragOverTask,
    onTopicDragOver,
    onDrop,
    onDragEnd,
  };
};

export default useTasksDragAndDrop;
