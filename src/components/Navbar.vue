<script lang="ts">
import {defineComponent} from 'vue'
import ProfilePreview from './ProfilePreview.vue'

export default defineComponent({
  name: "Navbar",
  components: {ProfilePreview}
})
</script>

<template>
  <div class="navbar">
    <RouterLink class="logo" to="/">
      task tracker
    </RouterLink>
    <ProfilePreview/>
  </div>
</template>

<style scoped>
.navbar {
  height: 3.2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2em;
  border-bottom: 1px solid var(--border-light-color);
}

.logo {
  color: var(--text-color);
  font-size: 1.2em;
  font-weight: 500;
  letter-spacing: 2px;
}
</style>