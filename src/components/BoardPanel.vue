<script lang="ts" setup>
import BaseIcon from "./BaseIcon.vue";

const mode = defineModel('mode', {required: true});
const name = defineModel("name", { required: true });

function switchMode () {
  if (mode.value === 'topics') mode.value = 'calendar';
  else mode.value = 'topics';
}
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
      <div class="controllers">
        <div class="collaborators">
          <img class="avatar" src="../assets/images/avatar.jpg" alt="avatar"/>
          <img class="avatar" src="../assets/images/avatar.jpg" alt="avatar"/>
          <img class="avatar" src="../assets/images/avatar.jpg" alt="avatar"/>
          <div class="avatar no-image">+2</div>
        </div>
        <button class="btn">
          <BaseIcon
              name="settings"
              height="18px"
              width="18px"
          />
          Settings
        </button>
        <div class="divider"></div>
        <button
            class="toggle-mode"
            :aria-checked="mode === 'topics'"
            role="switch"
            @click="switchMode"
        >
          <span class="mode" :class="{active: mode === 'topics'}">
            <BaseIcon
                name="topics_grid"
                height="20px"
                width="20px"
            />
          </span>
          <span class="mode" :class="{active: mode === 'calendar'}">
            <BaseIcon
                name="calendar"
                height="20px"
                width="20px"
            />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.board-panel-section {
  padding: 2em 2em;
}

.board-panel {
  align-items: center;
  background-color: var(--background-color);
  border-radius: 1em;
  display: flex;
  justify-content: space-between;
}

.title-input {
  border: none;
  border-radius: 0.3em;
  font-family: Avenir, sans-serif;
  font-size: 1.875em;
  line-height: 1em;
  font-weight: 500;
  margin: 0;
  padding: 0.16em;
}

.title-input:focus {
  background-color: var(--background-second-color);
  outline: 2px solid var(--border-color);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 1.25em;
}

.breadcrumbs {
  align-items: center;
  color: var(--text-light-color);
  display: flex;
  font-size: 0.875em;
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

.controllers {
  display: flex;
  align-items: center;
  gap: 1.75em;
}

.collaborators {
  display: flex;
}

.collaborators > .avatar:not(:first-child) {
  margin-left: -0.875em;
}

.divider {
  align-self: stretch;
  background-color: var(--border-color);
  height: 2.25em;
  width: 1px;
}

.toggle-mode {
  display: flex;
  cursor: pointer;
  gap: 2px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0.5em;
  overflow: hidden;
  background-color: var(--second-background-color);
}

.mode {
  padding: 0.5em;
  border-radius: 0.5em;
  background-color: var(--second-background-color);
  color: var(--primary-color);
  transition: .2s;
}

.mode.active {
  background-color: var(--primary-color);
  color: #fff;
}
</style>
