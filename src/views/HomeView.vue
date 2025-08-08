<script lang="ts">
import {defineComponent} from 'vue'
import BoardsList from "../components/BoardsList.vue";

export default defineComponent({
  name: "HomeView",
  components: {BoardsList}
})
</script>

<template>
  <BoardsList/>
</template>

<style scoped>

</style>