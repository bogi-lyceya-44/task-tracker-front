import { type Ref } from "vue";

import {
  type DragEntity,
  type DragEntityMap,
  useDragState,
} from "./useDragState.ts";
const useDragAndDropReorder = <K extends keyof DragEntityMap>(
  items: Ref<DragEntityMap[K][] | null | undefined>,
  type: K,
) => {
  const dragState = useDragState();

  const onDragStart = (item: DragEntityMap[K]) => {
    dragState.draggedEntity.value = { type, entity: item } as DragEntity;
  };

  const onDragOver = (item: DragEntityMap[K], pos: number) => {
    const dragEntity = dragState.draggedEntity.value;

    if (!items.value || item.id === dragEntity?.entity.id) return;

    if (dragEntity?.type === type) {
      if (dragState.afterDragOut.value) dragState.afterDragOut.value();

      let updated = items.value.filter(
        (item) => item.id !== dragEntity?.entity.id,
      );

      updated = [
        ...updated.slice(0, pos),
        dragEntity?.entity as DragEntityMap[K],
        ...updated.slice(pos),
      ];

      items.value = updated;
    }
  };

  const onDragEnd = () => {
    dragState.draggedEntity.value = null;
    dragState.afterDragOut.value = null;
  };

  return {
    onDragStart,
    onDragOver,
    onDragEnd,
  };
};

export default useDragAndDropReorder;
