<script setup lang="ts" generic="T">
import { useDragState } from "../composables/useDragState.ts";

interface DraggableProps {
  fullList: T[];
  index: number;
  pos?: string;

  onBeforeDragStart?: () => void;
  onAfterDragStart?: () => void;
  onBeforeDragOver?: () => void;
  onAfterDragOver?: (newList: T[]) => void;
  onBeforeDragDrop?: () => void;
  onAfterDragDrop?: () => void;
  onBeforeDragEnd?: () => void;
  onAfterDragEnd?: () => void;
}

const props = withDefaults(defineProps<DraggableProps>(), {
  pos: "mid",
});
const { draggedIndex, startDrag, stopDrag } = useDragState();

function reorder(arr: T[], from: number, to: number): T[] {
  const copy = [...arr];
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved);
  return copy;
}

function handleDragStart(
  event: DragEvent,
  index: number,
) {
  event.dataTransfer!.setData('application/draggable', 'true');
  event.dataTransfer!.effectAllowed = 'move';

  props.onBeforeDragStart?.();

  startDrag(index);

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

  if (props.pos === "top") {
    event.dataTransfer!.setDragImage(dragGhost, width / 2, 20);
  } else {
    event.dataTransfer!.setDragImage(dragGhost, width / 2, height / 2);
  }

  setTimeout(() => document.body.removeChild(dragGhost), 0);

  props.onAfterDragStart?.();
}

function handleDragOver(index: number) {
  props.onBeforeDragOver?.();

  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    const newList = reorder(props.fullList, draggedIndex.value, index);
    startDrag(index);
    props.onAfterDragOver?.(newList);
  }
}

function handleDrop() {
  props.onBeforeDragDrop?.();
  stopDrag();
  props.onAfterDragDrop?.();
}

function handleDragEnd() {
  props.onBeforeDragEnd?.();
  stopDrag();
  props.onAfterDragEnd?.();
}
</script>

<template>
  <div
    draggable="true"
    @dragstart="handleDragStart($event, props.index)"
    @dragover.prevent="handleDragOver(props.index)"
    @drop="handleDrop"
    @dragend="handleDragEnd"
    :class="{ dragging: draggedIndex === props.index }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.dragging {
  color: var(--text-light-color);
  opacity: 0.4;
  overflow: hidden;
  position: relative;
}
</style>