<script lang="ts">
import { defineComponent } from "vue";

import ProfilePreview from "./ProfilePreview.vue";

export default defineComponent({
  name: "AppNavbar",
  components: { ProfilePreview },
});
</script>

<template>
  <div class="navbar">
    <RouterLink class="logo" to="/"> task tracker </RouterLink>
    <ProfilePreview />
  </div>
</template>

<style scoped>
.navbar {
  align-items: center;
  border-bottom: 1px solid var(--border-light-color);
  display: flex;
  height: 3.2em;
  justify-content: space-between;
  padding: 0 2em;
}

.logo {
  color: var(--text-color);
  font-size: 1.2em;
  font-weight: 500;
  letter-spacing: 2px;
}
</style>
