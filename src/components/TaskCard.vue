<script setup lang="ts">
import Icon from './Icon'

defineProps<{
  title: string;
  description: string | undefined;
}>();
</script>

<template>
  <div class="task-card">
    <button class="edit-button">
      <Icon name="edit" size="1.2em" />
    </button>
    <span class="title">{{ title }}</span>
    <span v-if="description" class="description">{{ description }}</span>
  </div>
</template>

<style scoped>
.task-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  border: 1px solid var(--background-color);
  border-radius: 0.75em;
  background-color: var(--background-color);
  box-shadow: 0 1px 1px #c8cce5;
  gap: 0.25em;
}

.edit-button {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  display: flex;
  padding: 0.1875em;
  border: none;
  border-radius: 0.25em;
  background-color: transparent;
  opacity: 0;
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
  max-width: calc(100% - 1.2em);
  font-weight: 500;
}

.description {
  color: var(--second-text-color);
  font-size: 0.875em;
}
</style>
