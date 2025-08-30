<!--import { defineComponent } from "vue";-->
<!--import { RouterLink } from "vue-router";-->

<!--import avatarImage from "../../assets/images/avatar.jpg";-->
<!--import Icon from "../Icon";-->

<!--import BoardSettingsMenu from "./BoardSettingsMenu.tsx";-->
<!--import styles from "./boardPanel.style.ts";-->

<!--const BoardPanel = defineComponent(-->
<!--  (props, { emit }) => {-->

<!--    return () => (-->

<!--    );-->
<!--  },-->
<!--  {-->
<!--    props: { mode: String, name: String },-->
<!--    emits: ["update:mode", "update:name"],-->
<!--  },-->
<!--);-->

<!--export default BoardPanel;-->

<script setup lang="ts">
import type { PropType } from "vue";
import { RouterLink } from "vue-router";

import avatarImage from "../../assets/images/avatar.jpg";
import Icon from "../BaseIcon/BaseIcon.vue";

import BoardSettingsMenu from "./BoardSettingsMenu.vue";
import styles from "./boardPanel.style";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  mode: {
    type: String as PropType<"topics" | "calendar">,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "update:name", value: string): void;
  (e: "update:mode", value: "topics" | "calendar"): void;
}>();

const switchMode = () => {
  emit("update:mode", props.mode === "topics" ? "calendar" : "topics");
};

const onInput = (e: Event) => {
  emit("update:name", (e.target as HTMLInputElement).value);
};
</script>

<template>
  <section :class="styles.boardPanelSection">
    <div :class="styles.boardPanel">
      <div :class="styles.info">
        <div :class="styles.breadcrumbs">
          <RouterLink to="/">Home</RouterLink>
          <Icon name="arrow_right" size="0.6rem" />
          <span>{{ props.name }}</span>
        </div>

        <!-- TODO: заменить на кастомный input с debounce -->
        <input
          :class="styles.titleInput"
          type="text"
          :value="props.name"
          @input="onInput"
        />
      </div>

      <div :class="styles.controllers">
        <div :class="styles.collaborators">
          <img :class="styles.avatar" :src="avatarImage" alt="avatar" />
          <img :class="styles.avatar" :src="avatarImage" alt="avatar" />
          <img :class="styles.avatar" :src="avatarImage" alt="avatar" />
          <div :class="[styles.avatar, styles.noImage]">+2</div>
        </div>

        <BoardSettingsMenu />

        <div :class="styles.divider"></div>

        <button
          :class="styles.toggleMode"
          :aria-checked="props.mode === 'topics'"
          role="switch"
          @click="switchMode"
        >
          <span
            :class="{ [styles.mode]: true, active: props.mode === 'topics' }"
          >
            <Icon name="topics_grid" size="1.25rem" />
          </span>
          <span
            :class="{ [styles.mode]: true, active: props.mode === 'calendar' }"
          >
            <Icon name="calendar" size="1.25rem" />
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
