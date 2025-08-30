<script setup lang="ts">
import Icon from "../BaseIcon";

import styles from "./taskCard.style";

defineProps<{
  title: string;
  description: string | undefined;
}>();
</script>

<template>
  <div :class="styles.taskCard">
    <button :class="styles.editButton">
      <Icon name="edit" size="1.2em" />
    </button>
    <span :class="styles.title">{{ title }}</span>
    <span v-if="description" :class="styles.description">{{
      description
    }}</span>
  </div>
</template>
