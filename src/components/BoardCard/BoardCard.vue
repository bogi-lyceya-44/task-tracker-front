<script setup lang="ts">
import styles from "./boardCard.style";

const props = defineProps({
  id: String,
  name: String,
});
</script>

<template>
  <RouterLink :class="styles.boardLink" :to="`/board/${props.id}`">
    <div :class="styles.boardCard">
      <div :class="styles.boardCardInfo">
        {{ props.name }}
      </div>
    </div>
  </RouterLink>
</template>
