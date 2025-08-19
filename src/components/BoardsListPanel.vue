<script setup lang="ts">

import {router} from "../router.ts";
import {request} from "../utils/httpRequest.ts";
import BaseIcon from "./BaseIcon.vue";

async function onCreateNewBoard() {
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
}
</script>

<template>
  <div class="panel">
    <h1 class="title">Boards List</h1>
    <button class="btn" @click="onCreateNewBoard">
      <BaseIcon name="plus" class="button-image" alt="plus" /> New board
    </button>
  </div>
</template>

<style scoped>

.panel {
  display: flex;
  justify-content: space-between;
}

.title {
  font-size: 2.25em;
  font-weight: 500;
  margin: 0;
}

.button-image {
  height: 0.9em;
  width: 0.9em;
}


</style>