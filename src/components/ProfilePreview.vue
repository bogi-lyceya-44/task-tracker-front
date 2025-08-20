<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, useTemplateRef} from "vue";

import BaseIcon from "./BaseIcon.vue";

const wrapper = useTemplateRef<HTMLDivElement>('wrapper');
const isOpen = ref(false);


function handleClickOutside(event: MouseEvent) {
  if (isOpen.value && wrapper.value && !wrapper.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

function openProfilePreview() {
  isOpen.value = !isOpen.value;
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
})
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
})
</script>

<template>
  <div class="profile-wrapper" ref="wrapper">
    <button class="profile-preview" @click="openProfilePreview">
      <img class="avatar" src="../assets/images/avatar.jpg" alt="avatar"/>
    </button>
    <div class="menu" :class="{ open: isOpen }">
      <div class="account-info">
        <img
            class="account-avatar"
            src="../assets/images/avatar.jpg"
            alt="avatar"
        />
        <div class="account-content">
          <span class="account-nickname">Emo Princess Shine</span>
          <span class="account-email">petr.ahtimirov@gmail.com</span>
        </div>
      </div>
      <hr class="hr"/>
      <div class="menu-list">
        <RouterLink class="menu-item" to="/profile" @click="isOpen = false">
          <span>Profile</span>
        </RouterLink>
        <button class="menu-item" @click="isOpen = false">
          <span>Settings</span>
        </button>
        <button class="menu-item danger" @click="isOpen = false">
          <span>Sign out</span>
          <BaseIcon class="menu-item-icon" name="log_out" alt="Log out"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-wrapper {
  position: relative;
}

.profile-preview {
  background-color: inherit;
  border: none;
  border-radius: 2em;
  cursor: pointer;
  display: flex;
  font-family: Avenir, sans-serif;
  font-size: 1em;
  outline: 0;
  padding: 0;
}

.menu {
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 1em;
  box-shadow: 0 0.4em 1em 0 #dbdbdb;
  opacity: 0;
  padding: 0.5em;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 3em;
  transform: translateY(-0.5em);
  transition: opacity 0.3s ease,
  transform 0.3s ease;
}

.menu.open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.account-info {
  align-items: center;
  display: flex;
  gap: 1em;
}

.account-avatar {
  border: 1px solid var(--border-color);
  border-radius: 2em;
  height: 3.2em;
  width: 3.2em;
}

.account-content {
  display: flex;
  flex-direction: column;
  min-width: 8em;
}

.account-nickname {
  max-width: 12em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.account-email {
  color: var(--text-color);
  font-size: 0.8em;
  max-width: 12em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hr {
  background-color: var(--border-color);
  border: none;
  height: 1px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}

.menu-item {
  align-items: center;
  background-color: inherit;
  border: none;
  border-radius: 0.6em;
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  font-size: 1em;
  font-weight: 400;
  height: 2.5em;
  justify-content: space-between;
  padding: 0 0.6em;
  transition: 0.3s;
  width: 100%;
}

.menu-item.danger {
  color: var(--text-danger-color);
}

.menu-item:hover {
  background-color: var(--background-second-color);
}

.menu-item.danger:hover {
  background-color: var(--background-danger-color);
}

.menu-item-icon {
  height: 1.2em;
  width: 1.2em;
}
</style>
