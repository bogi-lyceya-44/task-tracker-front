import { onMounted, ref } from "vue";

import type { TaskCardType } from "../types.ts";
import { request } from "../utils/httpRequest.ts";

const useTopic = (name: string, taskIdsList: string[], topicId: string) => {
  const topicName = ref<string>(name);
  const taskIds = ref<string[]>(taskIdsList);
  const tasks = ref<TaskCardType[]>([]);

  onMounted(() => {
    if (taskIds.value.length === 0) tasks.value = [];
    else {
      request("/get_tasks", "POST", { ids: taskIdsList }).then((res) => {
        tasks.value = res.tasks;
      });
    }
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
      .then(() =>
        request("/get_tasks", "POST", { ids: taskIds.value }).then((res) => {
          tasks.value = res.tasks;
        }),
      );

  return { topicName, tasks, addTask };
};

export default useTopic;
