<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import BoardPanel from "../components/BoardPanel.vue";
import TopicsList from "../components/TopicsList.vue";
import type {BoardMode} from "../types.ts";
import { request } from "../utils/httpRequest.ts";

const boardName = ref("");
const boardMode = ref<BoardMode>("topics");
const boardId = useRoute().params.id;

onMounted(async () => {
  const board = (
    await request("/get_boards", "POST", { ids: [String(boardId)] })
  ).boards[0];
  boardName.value = board.name;
});

watch(boardName, async (boardName, prevBoardName) => {
  if (boardName !== prevBoardName) {
    await request("/update_boards", "POST", {
      boardsToUpdate: [{ id: String(boardId), name: boardName }],
    });
  }
});
</script>

<template>
  <div class="board-wrapper">
    <BoardPanel
        v-model:name="boardName"
        v-model:mode="boardMode"
    />
    <TopicsList v-if="boardMode === 'topics'" />
  </div>
</template>

<style scoped>
.board-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
