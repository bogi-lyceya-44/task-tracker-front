import { type Ref } from "vue";

import {
  type DragEntity,
  type DragEntityMap,
  useDragState,
} from "./useDragState.ts";
const useDragAndDropReorder = <K extends keyof DragEntityMap>(
  items: Ref<DragEntityMap[K][] | null | undefined>,
  type: K,
  pos: "top" | "mid" = "mid",
) => {
  const dragState = useDragState();

  const onDragStart = (event: DragEvent, item: DragEntityMap[K]) => {
    event.dataTransfer!.setData("application/draggable", "true");
    event.dataTransfer!.effectAllowed = "move";

    const target = event.target as HTMLElement;
    if (!target) return;

    const dragGhost = target.cloneNode(true) as HTMLElement;
    const { width, height } = target.getBoundingClientRect();

    Object.assign(dragGhost.style, {
      height: `${height}px`,
      left: "-1000px",
      pointerEvents: "none",
      position: "absolute",
      top: "-1000px",
      width: `${width}px`,
    });

    document.body.appendChild(dragGhost);

    if (pos === "top") {
      event.dataTransfer!.setDragImage(dragGhost, width / 2, 20);
    } else {
      event.dataTransfer!.setDragImage(dragGhost, width / 2, height / 2);
    }

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
