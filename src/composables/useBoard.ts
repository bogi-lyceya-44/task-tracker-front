import throttle from "lodash/throttle";
import { onMounted, ref, watch } from "vue";

import type { TopicColumnType } from "../types.ts";
import { request } from "../utils/httpRequest.ts";

const useBoard = (boardId: string) => {
  const boardName = ref<string | null>(null);
  const topicIds = ref<string[]>([]);
  const topics = ref<TopicColumnType[] | null>(null);

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

  const updateBoard = async (id: string, topicIdsList: string[]) => {
    return request("/update_boards", "POST", {
      boardsToUpdate: [{ id: id, topicIds: topicIdsList }],
    }).then(() => {
      topicIds.value = topicIdsList;
    });
  };

  onMounted(async () => {
    await fetchBoard();
  });

  const addTopic = (topicName: string) =>
    request("/create_topics", "POST", {
      topicsToCreate: [{ name: topicName }],
    })
      .then((res) => updateBoard(boardId, [res.ids[0], ...topicIds.value]))
      .then(fetchBoard);

  const deleteTopic = (topicId: string) =>
    request("/delete_topics", "POST", { ids: [topicId] })
      .then(() =>
        updateBoard(
          boardId,
          topicIds.value.filter((i) => i !== topicId),
        ),
      )
      .then(fetchBoard);

  const throttledRenameRequest = throttle(
    (name: string) => {
      request("/update_boards", "POST", {
        boardsToUpdate: [
          {
            id: boardId,
            name,
          },
        ],
      });
    },
    800,
    { leading: false, trailing: true },
  );

  watch(boardName, (newValue) => {
    if (newValue) throttledRenameRequest(newValue);
  });

  return { boardName, topics, fetchBoard, addTopic, deleteTopic };
};

export default useBoard;
