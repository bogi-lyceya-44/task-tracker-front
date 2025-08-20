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
      <BaseIcon
          name="edit"
          height="14px"
          width="14px"
      />
    </button>
    <span class="title">{{ title }}</span>
    <span class="description">{{ description }}</span>
  </div>
</template>

<style scoped>
.task-card {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 0.25em;
  background-color: var(--background-color);
  border: 1px solid var(--background-color);
  border-radius: 0.75em;
  padding: 0.5em;
  box-shadow: 0 1px 1px #C8CCE5;
}

.edit-button {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  border: none;
  border-radius: 0.25em;
  padding: 0.1875em;
  background-color: transparent;
  transition: .3s;
  display: flex;
}

.task-card:hover > .edit-button {
  opacity: 1;
  visibility: visible;
  cursor: pointer;
}

.edit-button:hover {
  background-color: var(--second-background-color);
}

.title {
  font-weight: 500;
  max-width: calc(100% - 1.2em);
}

.description {
  font-size: 0.875em;
  color: var(--second-text-color);
}
</style>
