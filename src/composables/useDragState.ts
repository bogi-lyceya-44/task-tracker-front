import { ref } from "vue";

// singleton shit
// probably could do better
const draggedIndex = ref<number | null>(null);

export function useDragState() {
  const startDrag = (index: number) => {
    draggedIndex.value = index;
  }

  const stopDrag = () => {
    draggedIndex.value = null;
  }

  return {
    draggedIndex,
    startDrag,
    stopDrag,
  };
}