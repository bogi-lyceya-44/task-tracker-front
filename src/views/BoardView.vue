<script setup lang="ts">
import { provide, ref } from "vue";
import { useRoute } from "vue-router";

import BoardPanel from "../components/BoardPanel";
import TopicsList from "../components/TopicsList";
import useBoard from "../composables/useBoard.ts";
import type { BoardMode } from "../types.ts";
const boardMode = ref<BoardMode>("topics");
const boardId = useRoute().params.id;

const { boardName, topics, addTopic } = useBoard(String(boardId));

provide<(name: string) => void>("addTopic", addTopic);
</script>

<template>
  <div class="board-wrapper">
    <BoardPanel
      v-if="boardName"
      v-model:name="boardName"
      v-model:mode="boardMode"
    />
    <TopicsList v-model:topics="topics" v-if="boardMode === 'topics'" />
  </div>
</template>

<style scoped>
.board-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
