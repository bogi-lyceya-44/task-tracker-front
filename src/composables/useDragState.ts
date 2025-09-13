import { ref } from "vue";

import type { BoardCardType, TaskCardType, TopicColumnType } from "../types.ts";

export type DragEntityMap = {
  task: TaskCardType;
  topic: TopicColumnType;
  board: BoardCardType;
};

export type DragEntity =
  | { type: "task"; entity: TaskCardType }
  | { type: "topic"; entity: TopicColumnType }
  | { type: "board"; entity: BoardCardType };

const draggedEntity = ref<DragEntity | null>(null);
const afterDragOut = ref<(() => void) | null>(null);

const startDrag = (entity: DragEntity) => {
  draggedEntity.value = entity;
};

const stopDrag = () => {
  draggedEntity.value = null;
};

export function useDragState() {
  return {
    draggedEntity,
    startDrag,
    afterDragOut,
    stopDrag,
  };
}
