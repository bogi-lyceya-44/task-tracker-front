<script lang="ts">
import {defineComponent} from 'vue'
import BoardCard from "./BoardCard.vue";

export default defineComponent({
  name: "BoardsList",
  components: {BoardCard},
  data() {
    return {
      boards: [
        {id: 0, name: 'board'},
        {id: 1, name: 'board'},
        {id: 2, name: 'board'},
        {id: 3, name: 'board'},
        {id: 4, name: 'board'},
        {id: 5, name: 'board'},
      ]
    }
  }
})
</script>

<template>
  <section class="boards-list-section">
    <h1 class="title">Boards List</h1>
    <div class="boards-list">
      <BoardCard
          v-for="board in boards"
          :key="board.id"
          :name="board.name"
      />
    </div>
  </section>
</template>

<style scoped>
.boards-list-section {
  padding: 1.8em 2em;
}

.title {
  margin: 0;
  font-size: 2.25em;
  font-weight: 500;
}

.boards-list {
  max-width: calc(16em * v-bind('boards.length') + 1em * (v-bind('boards.length') - 1));
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
  gap: 1em;
}
</style>