<script lang="ts">
import { defineComponent } from "vue";

import AppNavbar from "./components/AppNavbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar: AppNavbar,
  },
});
</script>

<template>
  <div class="app" @dragover.stop.prevent>
    <Navbar />
    <RouterView class="main-content" />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
