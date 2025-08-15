import { ref } from "vue";

function useDragAndDrop<T>() {
  const draggedIndex = ref<number | null>(null);

  function reorder(arr: T[], from: number, to: number): T[] {
    const copy = [...arr];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    return copy;
  }

  function handleDragStart(
    event: DragEvent,
    index: number,
    pos: "top" | "mid" = "mid",
  ) {
    draggedIndex.value = index;

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
    setTimeout(() => document.body.removeChild(dragGhost), 0);
  }

  function handleDragOver(list: T[], index: number) {
    if (draggedIndex.value === null || draggedIndex.value === index)
      return list;

    const newList = reorder(list, draggedIndex.value, index);
    draggedIndex.value = index;
    return newList;
  }

  function handleDrop() {
    draggedIndex.value = null;
  }

  function handleDragEnd() {
    draggedIndex.value = null;
  }

  return {
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}

export { useDragAndDrop };
