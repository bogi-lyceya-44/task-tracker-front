<script setup lang="ts">
import { provide, ref } from "vue";
import { useRoute } from "vue-router";

import BoardPanel from "../components/BoardPanel";
import TopicsList from "../components/TopicsList";
import TopicsListSkeleton from "../components/TopicsList/TopicsListSkeleton/TopicsListSkeleton.vue";
import useBoard from "../composables/useBoard.ts";
import type { BoardMode } from "../types.ts";

const boardMode = ref<BoardMode>("topics");
const boardId = String(useRoute().params.id);

const { boardName, topics, addTopic, deleteTopic } = useBoard(boardId);

provide<(name: string) => void>("addTopic", addTopic);
provide<(name: string) => void>("deleteTopic", deleteTopic);
</script>

<template>
  <div class="board-wrapper">
    <BoardPanel
      v-if="boardName"
      v-model:name="boardName"
      v-model:mode="boardMode"
    />
    <div class="topics-wrapper" v-if="boardMode === 'topics'">
      <TopicsList v-if="topics" v-model:topics="topics" />
      <TopicsListSkeleton v-else />
    </div>
  </div>
</template>

<style scoped>
.board-wrapper {
  display: flex;
  flex-direction: column;
}
.topics-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
