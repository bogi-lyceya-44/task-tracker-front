<script setup lang="ts">
import { ref } from "vue";

import usePopupMenu from "../../composables/usePopupMenu.ts";
import BaseIcon from "../BaseIcon/BaseIcon.vue";

import styles from "./editableText.styles.ts";

const title = defineModel<string>();

const wrapper = ref<HTMLDivElement | null>(null);
const { isOpen, switchOpenPreview } = usePopupMenu(wrapper);

const vSelect = {
  mounted: (el: HTMLInputElement) => {
    el.select();
  },
};
</script>

<template>
  <div ref="wrapper" :class="styles.wrapper">
    <div :class="[styles.titleWrapper, { [styles.hide]: isOpen }]">
      <button :class="styles.editButton" @click="switchOpenPreview">
        <span>{{ title }}</span>
        <BaseIcon :class="styles.editIcon" name="edit" size="0.8em" />
      </button>
    </div>
    <input :class="styles.editInput" v-if="isOpen" v-model="title" v-select />
  </div>
</template>
