import type { Ref } from "vue";

import { useDragState } from "../../composables/useDragState.ts";
import type { BoardCardType } from "../../types.ts";

const useBoardsDragAndDrop = (boards: Ref<BoardCardType[]>) => {
  const dragState = useDragState();

  const onDragStart = (board: BoardCardType) => {
    dragState.startDrag({ type: "board", entity: board });
    dragState.afterDragOut.value = null;
  };

  const onDragOver = (board: BoardCardType, pos: number) => {
    const dragEntity = dragState.draggedEntity.value;

    if (!boards.value || board.id === dragEntity?.entity.id) return;

    if (dragEntity?.type === "board") {
      let updated = boards.value.filter((t) => t.id !== dragEntity.entity.id);

      updated = [
        ...updated.slice(0, pos),
        dragEntity.entity,
        ...updated.slice(pos),
      ];

      boards.value = updated;
    }
  };

  return {
    onDragStart,
    onDragOver,
  };
};

export default useBoardsDragAndDrop;
