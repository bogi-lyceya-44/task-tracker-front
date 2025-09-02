import { onMounted, ref } from "vue";

import { request } from "../utils/httpRequest.ts";

interface Topic {
  id: string;
  name: string;
  taskIds: string[];
}

const useBoard = (boardId: string) => {
  const boardName = ref<string | null>(null);
  const topicIds = ref<string[]>([]);
  const topics = ref<Topic[] | null>(null);

  const fetchBoard = () =>
    request("/get_boards", "POST", { ids: [boardId] })
      .then((res) => {
        const board = res.boards[0];
        boardName.value = board.name;
        topicIds.value = board.topicIds;
        return board.topicIds;
      })
      .then((topicIds) =>
        request("/get_topics", "POST", {
          ids: topicIds,
        }),
      )
      .then((res) => {
        topics.value = res.topics;
      });

  onMounted(async () => {
    await fetchBoard();
  });

  const addTopic = (topicName: string) =>
    request("/create_topics", "POST", {
      topicsToCreate: [{ name: topicName }],
    })
      .then((res) => {
        return request("/update_boards", "POST", {
          boardsToUpdate: [
            { id: boardId, topicIds: [res.ids[0], ...topicIds.value] },
          ],
        });
      })
      .then(fetchBoard);

  return { boardName, topics, fetchBoard, addTopic };
};

export default useBoard;
