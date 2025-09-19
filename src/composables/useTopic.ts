import throttle from "lodash/throttle";
import { onMounted, ref, watch } from "vue";

import type { TaskCardType } from "../types.ts";
import { request } from "../utils/httpRequest.ts";

const useTopic = (name: string, taskIdsList: string[], topicId: string) => {
  const topicName = ref<string>(name);
  const taskIds = ref<string[]>(taskIdsList);
  const tasks = ref<TaskCardType[]>([]);

  const getTasks = async () => {
    const res = await request("/get_tasks", "POST", { ids: taskIds.value });
    tasks.value = res.tasks;
  };

  onMounted(async () => {
    if (taskIds.value.length === 0) tasks.value = [];
    else {
      await getTasks();
    }
  });

  const throttledRenameRequest = throttle(
    (name: string) => {
      request("/update_topics", "POST", {
        topicsToUpdate: [
          {
            id: topicId,
            name,
          },
        ],
      });
    },
    800,
    { leading: false, trailing: true },
  );

  watch(topicName, (newValue) => {
    throttledRenameRequest(newValue);
  });

  const addTask = (name: string) =>
    request("/create_tasks", "POST", {
      tasksToCreate: [
        {
          name: name,
          priority: "PRIORITY_LOW",
          description: "312",
          startTime: new Date().toISOString(),
        },
      ],
    })
      .then(async (res) => {
        const taskId = res.ids[0];

        await request("/update_topics", "POST", {
          topicsToUpdate: [
            {
              id: topicId,
              taskIds: [...taskIds.value, taskId],
            },
          ],
        });

        taskIds.value = [...taskIds.value, taskId];
      })
      .then(getTasks);

  const deleteTask = async (deleteId: string) => {
    const newTaskIds = taskIds.value.filter((id) => id !== deleteId);
    await request("/update_topics", "POST", {
      topicsToUpdate: [{ id: topicId, taskIds: newTaskIds }],
    });
    taskIds.value = newTaskIds;

    await getTasks();
  };

  const updateTask = async (
    updateId: string,
    name: string,
    description: string,
  ) => {
    await request("/update_tasks", "POST", {
      tasksToUpdate: [
        {
          id: updateId,
          name,
          description,
        },
      ],
    });

    await getTasks();
  };

  return { topicName, tasks, addTask, deleteTask, updateTask };
};

export default useTopic;
