<script lang="ts">
import { defineComponent } from "vue";

import BoardPanel from "../components/BoardPanel.vue";
import TopicsList from "../components/TopicsList.vue";

export default defineComponent({
  name: "BoardView",
  components: { BoardPanel, TopicsList },
});
</script>

<template>
  <div class="board-wrapper">
    <BoardPanel :name="`board view ${$route.params.id}`" />
    <TopicsList />
  </div>
</template>

<style scoped>
.board-wrapper {
  background-color: #e8eefe;
  display: flex;
  flex-direction: column;
}
</style>
