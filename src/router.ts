import { createRouter, createWebHistory } from "vue-router";

import BoardView from "./views/BoardView.vue";
import HomeView from "./views/HomeView.vue";
import ProfileView from "./views/ProfileView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/board", component: BoardView },
  { path: "/profile", component: ProfileView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
