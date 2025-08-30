<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

import avatar from "../../assets/images/avatar.jpg";
import usePopupMenu from "../../composables/usePopupMenu.ts";
import Icon from "../BaseIcon";

import ThemeSwitcher from "./ThemeSwitcher.vue";
import styles from "./profilePreview.style";

const wrapper = ref<HTMLDivElement | null>(null);
const { isOpen, switchOpenPreview } = usePopupMenu(wrapper);
</script>

<template>
  <div :class="styles.profileWrapper" ref="wrapper">
    <button :class="styles.profilePreview" @click="switchOpenPreview">
      <img :class="styles.avatar" :src="avatar" alt="avatar" />
    </button>

    <div :class="[styles.menu, { [styles.menuOpen]: isOpen }]">
      <div :class="styles.accountInfo">
        <img :class="styles.accountAvatar" :src="avatar" alt="avatar" />
        <div :class="styles.accountContent">
          <span :class="styles.accountNickname">Emo Princess Shine</span>
          <span :class="styles.accountEmail">petr.ahtimirov@gmail.com</span>
        </div>
      </div>

      <hr :class="styles.hr" />

      <div :class="styles.menuList">
        <RouterLink
          to="/profile"
          :class="styles.menuItem"
          @click="isOpen = false"
        >
          <span>Profile</span>
        </RouterLink>

        <ThemeSwitcher :isParentOpen="isOpen" />

        <button
          :class="[styles.menuItem, styles.menuItemDanger]"
          @click="isOpen = false"
        >
          <span>Sign out</span>
          <Icon name="log_out" size="1.25rem" />
        </button>
      </div>
    </div>
  </div>
</template>
