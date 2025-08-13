<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskCard",
  props: {
    title: {
      required: true,
      type: String,
    },
  },
});
</script>

<template>
  <div class="task-card">
    <span class="title">{{ title }}</span>
  </div>
</template>

<style scoped>
.task-card {
  background-color: var(--background-color);
  border: 1px solid var(--border-light-color);
  border-radius: 0.6em;
  padding: 0.5em;
}
</style>
