<script lang="ts" setup>
import BaseIcon from "./BaseIcon.vue";

const name = defineModel("name", { required: true });
</script>

<template>
  <section class="board-panel-section">
    <div class="board-panel">
      <div class="info">
        <div class="breadcrumbs">
          <RouterLink to="/">Home</RouterLink>
          <BaseIcon
            class="breadcrumbs-pointer"
            name="arrow_right"
            alt="pointer"
          />
          <span>{{ name }}</span>
        </div>
        <!-- TODO: change lazy on custom input component with debounce -->
        <input class="title-input" type="text" v-model.lazy="name" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.board-panel-section {
  padding: 1.8em 2em;
}

.board-panel {
  align-items: center;
  background-color: var(--background-color);
  border-radius: 1em;
  display: flex;
  justify-content: space-between;
  padding: 1.2em;
}

.title-input {
  border: none;
  border-radius: 0.3em;
  font-family: Avenir, sans-serif;
  font-size: 1.4em;
  font-weight: 400;
  margin: 0;
  padding: 0.16em;
}

.title-input:focus {
  background-color: var(--background-second-color);
  outline: 2px solid var(--border-light-color);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.breadcrumbs {
  align-items: center;
  color: var(--text-light-color);
  display: flex;
  font-size: 0.9em;
  font-weight: 400;
  gap: 0.6em;
}

.breadcrumbs-pointer {
  height: 0.6em;
  width: 0.6em;
}

.breadcrumbs > a {
  color: var(--text-light-color);
}

.breadcrumbs > a:hover {
  text-decoration: underline;
}
</style>
