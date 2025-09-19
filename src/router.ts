import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("./views/HomeView.vue") },
  { path: "/board/:id", component: () => import("./views/BoardView.vue") },
  { path: "/profile", component: () => import("./views/ProfileView.vue") },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
