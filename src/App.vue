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
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
