import type { Ref } from "vue";

import { useDragState } from "../../composables/useDragState.ts";

import type { Topic } from "./TopicsList.vue";

const useTopicsDragAndDrop = (topics: Ref<Topic[] | null | undefined>) => {
  const dragState = useDragState();

  const onDragStart = (topic: Topic) => {
    dragState.startDrag({ type: "topic", entity: topic });
    dragState.afterDragOut.value = null;
  };

  const onDragOver = (topic: Topic, pos: number) => {
    const dragEntity = dragState.draggedEntity.value;

    if (!topics.value || topic.id === dragEntity?.entity.id) return;

    if (dragEntity?.type === "topic") {
      let updated = topics.value.filter((t) => t.id !== dragEntity.entity.id);

      updated = [
        ...updated.slice(0, pos),
        dragEntity.entity,
        ...updated.slice(pos),
      ];

      topics.value = updated;
    }
  };

  return {
    onDragStart,
    onDragOver,
  };
};

export default useTopicsDragAndDrop;
