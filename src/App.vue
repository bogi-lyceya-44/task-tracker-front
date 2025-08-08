<script lang="ts">
import {defineComponent} from 'vue';
import Navbar from './components/Navbar.vue';
import BoardsList from "./components/BoardsList.vue";

export default defineComponent({
  name: 'App',
  components: {
    BoardsList,
    Navbar
  }
});
</script>

<template>
  <Navbar/>
  <RouterView/>
</template>

<style scoped>
</style>
