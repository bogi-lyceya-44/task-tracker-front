<script setup lang="ts">
import { useRoute } from "vue-router";

import ProfilePreview from "../ProfilePreview";

import styles from "./appNavbar.style";

const route = useRoute();
</script>

<template>
  <div :class="styles.navbar">
    <div :class="styles.navWrapper">
      <RouterLink :class="styles.logo" to="/"> task tracker </RouterLink>
      <div :class="styles.divider"></div>
      <nav :class="styles.nav">
        <RouterLink
          :class="[styles.navItem, { active: route.fullPath === '/' }]"
          to="/"
        >
          Home
        </RouterLink>
        <RouterLink
          :class="[styles.navItem, { active: route.fullPath === '/profile' }]"
          to="/profile"
        >
          Profile
        </RouterLink>
      </nav>
    </div>
    <ProfilePreview />
  </div>
</template>
