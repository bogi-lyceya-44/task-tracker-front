<script setup lang="ts">
import ProfilePreview from "./ProfilePreview.vue";
</script>

<template>
  <div class="navbar">
    <RouterLink class="logo" to="/"> task tracker</RouterLink>
    <ProfilePreview/>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding: 0.5em 2em;
  justify-content: space-between;
}

.logo {
  color: var(--text-color);
  font-size: 1.2em;
  font-weight: 500;
  letter-spacing: 2px;
}
</style>
