<script setup lang="ts">
import styles from "./topicsListSkeleton.style";
</script>

<template>
  <div :class="styles.topicsList">
    <div v-for="n in 3" :key="n" :class="styles.topicSkeleton"></div>
  </div>
</template>
