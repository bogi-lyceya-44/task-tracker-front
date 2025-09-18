<script setup lang="ts">
import { ref } from "vue";

import usePopupMenu from "../../../composables/usePopupMenu.ts";
import Icon from "../../BaseIcon/BaseIcon.vue";

import styles from "./taskCreationForm.style.ts";

const addTaskForm = ref<HTMLFormElement | null>(null);

const { isOpen, switchOpenPreview } = usePopupMenu(addTaskForm);

const taskName = defineModel<string>({ default: "" });

const emit = defineEmits<{
  (e: "addTask", name: string): void;
}>();

const onSubmit = async () => {
  if (taskName.value) {
    emit("addTask", taskName.value);
  }

  switchOpenPreview();
};
</script>

<template>
  <button
    :class="styles.createCardButton"
    v-if="!isOpen"
    @click.stop="switchOpenPreview"
  >
    <Icon name="plus" size="0.9rem" />
    <span :class="styles.createCardText">Add Card</span>
  </button>
  <form
    :class="styles.createCardForm"
    ref="addTaskForm"
    @submit.prevent="onSubmit"
    v-else
  >
    <textarea
      :class="styles.textareaName"
      placeholder="Enter the name"
      v-model="taskName"
      autofocus
    ></textarea>
    <div :class="styles.buttonGroup">
      <button type="submit" :class="styles.createCardFormSubmit">
        Add Card
      </button>
      <button
        type="button"
        :class="styles.createCardFormClose"
        @click="switchOpenPreview"
      >
        Close
      </button>
    </div>
  </form>
</template>

<style scoped></style>
