<script setup lang="ts">
import { inject, ref } from "vue";

import usePopupMenu from "../../../composables/usePopupMenu.ts";
import Icon from "../../BaseIcon/BaseIcon.vue";

import styles from "./topicCreationForm.style";

const addTopicForm = ref<HTMLFormElement | null>(null);
const topicName = defineModel({ default: "topic name" });

const vSelect = {
  mounted: (el: HTMLInputElement) => {
    el.select();
  },
};

const { isOpen, switchOpenPreview } = usePopupMenu(addTopicForm);

const addTopic = inject<(name: string) => void>("addTopic");
const onSubmit = async () => {
  if (addTopic) addTopic(topicName.value);
  else console.error("Not found add topic inject");

  switchOpenPreview();
};
</script>

<template>
  <button
    v-if="!isOpen"
    key="button"
    :class="styles.addTopic"
    @click.stop="switchOpenPreview"
  >
    <Icon name="plus" size="0.9em" />
    <span>Add Topic</span>
  </button>
  <form
    v-if="isOpen"
    :class="styles.addTopicForm"
    ref="addTopicForm"
    @submit.prevent="onSubmit"
  >
    <input
      key="input"
      :class="styles.inputName"
      type="text"
      name="topic name"
      v-model="topicName"
      v-select
    />
    <div :class="styles.buttonGroup">
      <button :class="styles.addTopicFormSubmit" type="submit">
        Add topic
      </button>
      <button
        :class="styles.addTopicFormClose"
        @click="switchOpenPreview"
        type="button"
      >
        Close
      </button>
    </div>
  </form>
</template>
