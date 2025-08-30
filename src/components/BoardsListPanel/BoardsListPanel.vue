<script setup lang="ts">
import { router } from "../../router.ts";
import { request } from "../../utils/httpRequest.ts";
import Icon from "../BaseIcon/BaseIcon.vue";

import styles from "./boardsListPanel.style";

const onCreateNewBoard = async () => {
  const boardId = (
    await request("/create_boards", "POST", {
      boardsToCreate: [
        {
          name: "New board",
          topicIds: [],
        },
      ],
    })
  ).ids[0];
  await router.push(`/board/${boardId}`);
};
</script>

<template>
  <div :class="styles.panel">
    <h1 :class="styles.title">Boards List</h1>
    <button class="btn" @click="onCreateNewBoard">
      <Icon name="plus" size="0.9em" />
      New board
    </button>
  </div>
</template>
