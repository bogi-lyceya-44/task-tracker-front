<script lang="ts">
import {defineComponent} from 'vue';
import Test from './components/Test.vue';

export default defineComponent({
  name: 'App',
  components: {
    Test
  }
});
</script>

<template>
  <Test/>
</template>

<style scoped>
</style>
