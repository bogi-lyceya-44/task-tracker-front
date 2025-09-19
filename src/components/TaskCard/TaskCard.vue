<script setup lang="ts">
import { ref } from "vue";

import Icon from "../BaseIcon";

import styles from "./taskCard.style";

const title = defineModel<string>("title");
const description = defineModel<string | undefined>("description");

const emits = defineEmits(["delete", "update"]);

const isActive = ref<boolean>(false);

const openTask = () => {
  isActive.value = true;
};

const closeTask = () => {
  isActive.value = false;
};

const onDelete = () => {
  emits("delete");
  closeTask();
};

const onUpdate = () => {
  emits("update", title.value, description.value);
  closeTask();
};
</script>

<template>
  <div :draggable="!isActive">
    <div :class="styles.taskCardWrapper">
      <div :class="styles.taskCard">
        <button v-if="!isActive" :class="styles.editButton" @click="openTask">
          <Icon name="edit" size="1.2em" />
        </button>
        <span :class="styles.title">{{ title }}</span>
        <span v-if="description" :class="styles.description">{{
          description
        }}</span>
      </div>
      <form
        v-if="isActive"
        :class="styles.formWrapper"
        @submit.prevent="onUpdate"
      >
        <div :class="styles.taskCardActive">
          <input
            v-model="title"
            :class="styles.titleInput"
            type="text"
            name="title"
            id="title"
            :autofocus="true"
          />
          <textarea
            v-if="description"
            v-model="description"
            :class="styles.descriptionInput"
            name="description"
            id="description"
          />
        </div>
        <button :class="styles.saveButton" type="submit">Save</button>
        <div :class="styles.menu">
          <button
            :class="[styles.menuItem, styles.menuItemDanger]"
            @click="onDelete"
            type="button"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
    <div v-if="isActive" :class="styles.overlay" @click="closeTask"></div>
  </div>
</template>
