<script setup lang="ts">
import { inject, ref } from "vue";

import usePopupMenu from "../../../composables/usePopupMenu.ts";
import Icon from "../../BaseIcon/BaseIcon.vue";

import styles from "./topicSettingMenu.style.ts";

const props = defineProps<{ topicId: string }>();

const wrapper = ref<HTMLDivElement | null>(null);
const { isOpen, switchOpenPreview } = usePopupMenu(wrapper);

const deleteTopic = inject<(id: string) => void>("deleteTopic");

const onDelete = (id: string) => {
  if (deleteTopic) {
    deleteTopic(id);
  }
};
</script>

<template>
  <div :class="styles.settingWrapper" ref="wrapper">
    <button :class="styles.moreButton" @click="switchOpenPreview">
      <Icon name="more" size="1rem" />
    </button>
    <div :class="[styles.menu, { [styles.menuOpen]: isOpen }]">
      <button
        :class="[styles.menuItem, styles.menuItemDanger]"
        @click="() => onDelete(props.topicId)"
      >
        Delete topic
      </button>
    </div>
  </div>
</template>

<style scoped></style>
