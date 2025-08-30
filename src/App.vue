<script setup lang="ts">
import { provide } from "vue";
import { RouterView } from "vue-router";

import styles from "./app.style.ts";
import AppNavbar from "./components/AppNavbar";
import { useTheme } from "./composables/useTheme.ts";

const { theme, updateTheme } = useTheme();
provide("theme", theme);
provide("updateTheme", updateTheme);

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
</script>

<template>
  <div :class="styles.app" @dragover="handleDragOver">
    <AppNavbar />
    <RouterView :class="styles.mainContent" />
  </div>
</template>
