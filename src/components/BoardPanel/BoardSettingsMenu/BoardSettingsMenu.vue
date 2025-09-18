<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import usePopupMenu from "../../../composables/usePopupMenu.ts";
import { request } from "../../../utils/httpRequest.ts";
import Icon from "../../BaseIcon/BaseIcon.vue";

import styles from "./boardSettingsMenu.style.ts";

const wrapper = ref<HTMLDivElement | null>(null);
const { isOpen, switchOpenPreview } = usePopupMenu(wrapper);
const boardId = useRoute().params.id;
const router = useRouter();

const onDelete = async () => {
  await request("/delete_boards", "POST", { ids: [String(boardId)] });
  await router.push("/");
};
</script>

<template>
  <div :class="styles.settingsWrapper" ref="wrapper">
    <button class="btn" @click="switchOpenPreview">
      <Icon name="settings" size="1.125rem" />
      Settings
    </button>
    <div :class="[styles.menu, { [styles.menuOpen]: isOpen }]">
      <button :class="styles.menuItem">Invite people</button>
      <button
        :class="[styles.menuItem, styles.menuItemDanger]"
        @click="{ onDelete }"
      >
        Delete board
      </button>
    </div>
  </div>
</template>
