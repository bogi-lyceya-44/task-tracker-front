<script setup lang="ts">
import { inject, type Ref, ref, watch } from "vue";

import type { Theme, UpdateTheme } from "../../composables/useTheme.ts";
import Icon from "../BaseIcon";

import styles from "./profilePreview.style";

const props = defineProps({
  isParentOpen: {
    type: Boolean,
    required: true,
  },
});

const isOpenSub = ref(false);

const theme = inject("theme") as Ref<Theme>;
const updateTheme = inject("updateTheme") as UpdateTheme;

watch(
  () => props.isParentOpen,
  (isOpen) => {
    if (!isOpen) {
      isOpenSub.value = false;
    }
  },
);

const openSubMenu = () => {
  isOpenSub.value = !isOpenSub.value;
};
</script>

<template>
  <div :class="styles.menuItemWrapper">
    <button
      :class="[styles.menuItem, { [styles.menuItemActive]: isOpenSub }]"
      @click="openSubMenu"
    >
      <span>Theme</span>
      <Icon name="arrow_right" size="0.8125rem" />
    </button>

    <div :class="[styles.subMenu, { [styles.subMenuOpen]: isOpenSub }]">
      <button
        :class="[
          styles.menuItem,
          styles.subMenuItem,
          { [styles.menuItemActive]: theme === 'light' },
        ]"
        @click="updateTheme('light')"
      >
        <Icon name="sun" size="1.2em" />
        <span>Light</span>
      </button>

      <button
        :class="[
          styles.menuItem,
          styles.subMenuItem,
          { [styles.menuItemActive]: theme === 'dark' },
        ]"
        @click="updateTheme('dark')"
      >
        <Icon name="moon" size="1.2em" />
        <span>Dark</span>
      </button>

      <button
        :class="[
          styles.menuItem,
          styles.subMenuItem,
          { [styles.menuItemActive]: theme === 'system' },
        ]"
        @click="updateTheme('system')"
      >
        <Icon name="monitor-smartphone" size="1.2em" />
        <span>System</span>
      </button>
    </div>
  </div>
</template>
