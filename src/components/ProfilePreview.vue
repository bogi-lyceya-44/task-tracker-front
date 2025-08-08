<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfilePreview",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    openProfilePreview() {
      this.isOpen = !this.isOpen;
    },
    handleClickOutside(event: MouseEvent) {
      const wrapper = this.$refs.wrapper as HTMLElement;
      if (this.isOpen && wrapper && !wrapper.contains(event.target as Node)) {
        this.isOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
});
</script>

<template>
  <div class="profile-wrapper" ref="wrapper">
    <button class="profile-preview" @click="openProfilePreview">
      <img class="avatar" src="../assets/images/avatar.jpg" alt="avatar" />
    </button>
    <div class="menu" :class="{ open: isOpen }">
      <div class="account-info">
        <img
          class="account-info__avatar"
          src="../assets/images/avatar.jpg"
          alt="avatar"
        />
        <div class="account-info__content">
          <span class="account-info__nickname">Emo Princess Shine</span>
          <span class="account-info__email">petr.ahtimirov@gmail.com</span>
        </div>
      </div>
      <hr class="menu__hr" />
      <div class="menu__list">
        <RouterLink class="menu__item" to="/profile" @click="isOpen = false">
          <span>Profile</span>
        </RouterLink>
        <button class="menu__item danger" @click="isOpen = false">
          <span>Sign out</span>
          <img
            class="menu__item__icon"
            src="../assets/icons/log_out.svg"
            alt="Log out"
          />
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
  font-family: "Avenir", sans-serif;
  font-size: 1em;
  background-color: inherit;
  border-radius: 2em;
  outline: 0;
  padding: 0;
  display: flex;
  cursor: pointer;
  border: none;
}

.avatar {
  border-radius: 2em;
  height: 2em;
  width: 2em;
  border: 1px solid var(--border-light-color);
}

.menu {
  position: absolute;
  top: 3em;
  right: 0;
  background-color: var(--background-color);
  padding: 0.5em;
  border: 1px solid var(--border-light-color);
  border-radius: 1em;
  box-shadow: 0 0.4em 1em 0 var(--border-light-color);
  opacity: 0;
  transform: translateY(-0.5em);
  pointer-events: none;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.menu.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.account-info {
  display: flex;
  align-items: center;
  gap: 1em;
}

.account-info__avatar {
  border-radius: 2em;
  height: 3.2em;
  width: 3.2em;
  border: 1px solid var(--border-light-color);
}

.account-info__content {
  display: flex;
  flex-direction: column;
  min-width: 8em;
}

.account-info__nickname {
  max-width: 12em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.account-info__email {
  font-size: 0.8em;
  max-width: 12em;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-light-color);
}

.menu__hr {
  height: 1px;
  background-color: var(--border-light-color);
  border: none;
}

.menu__list {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}

.menu__item {
  height: 2.5em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-color);
  font-size: 1em;
  background-color: inherit;
  font-weight: 400;
  border: none;
  padding: 0 0.6em;
  border-radius: 0.6em;
  cursor: pointer;
  transition: 0.3s;
}

.menu__item.danger {
  color: var(--text-danger-color);
}

.menu__item:hover {
  background-color: var(--background-focus-color);
}

.menu__item.danger:hover {
  background-color: var(--background-danger-color);
}

.menu__item__icon {
  height: 1.2em;
}
</style>
