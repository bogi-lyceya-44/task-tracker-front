import { ref } from "vue";

import type { BoardCardType, TaskCardType, TopicColumnTask } from "../types.ts";

type DragEntity =
  | { type: "task"; entity: TaskCardType }
  | { type: "topic"; entity: TopicColumnTask }
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
