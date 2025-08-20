<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="task-card">
    <button class="edit-button">
      <BaseIcon name="edit" height="14px" width="14px" />
    </button>
    <span class="title">{{ title }}</span>
    <span v-if="description" class="description">{{ description }}</span>
  </div>
</template>

<style scoped>
.task-card {
  background-color: var(--background-color);
  border: 1px solid var(--background-color);
  border-radius: 0.75em;
  box-shadow: 0 1px 1px #c8cce5;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  padding: 0.5em;
  position: relative;
}

.edit-button {
  background-color: transparent;
  border: none;
  border-radius: 0.25em;
  display: flex;
  opacity: 0;
  padding: 0.1875em;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  transition: 0.3s;
  visibility: hidden;
}

.edit-button:hover {
  background-color: var(--second-background-color);
}

.task-card:hover > .edit-button {
  cursor: pointer;
  opacity: 1;
  visibility: visible;
}

.title {
  font-weight: 500;
  max-width: calc(100% - 1.2em);
}

.description {
  color: var(--second-text-color);
  font-size: 0.875em;
}
</style>
