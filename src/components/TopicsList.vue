<script lang="ts">
import { defineComponent } from "vue";

import { topicsList } from "../dataMock.ts";
import TopicColumn from "./TopicColumn.vue";

export default defineComponent({
  name: "TopicsList",
  components: { TopicColumn },
  data() {
    return {
      topics: topicsList,
    };
  },
});
</script>

<template>
  <section class="topics-list-section">
    <div class="topics-list">
      <TopicColumn
        v-for="topic in topics"
        :key="topic.id"
        :cards="topic.cards"
        :name="topic.name"
      />
    </div>
  </section>
</template>

<style scoped>
.topics-list-section {
  padding: 0 2em 1.8em;
}

.topics-list {
  display: flex;
  gap: 2em;
}
</style>
