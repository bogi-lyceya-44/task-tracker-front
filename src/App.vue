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
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
