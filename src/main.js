import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import PlayerProfile from "./views/PlayerProfile.vue";
import ClubPage from "./views/ClubPage.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/player/:tag",
    name: "PlayerProfile",
    component: PlayerProfile,
    props: true,
  },
  {
    path: "/club/:tag",
    name: "ClubPage",
    component: ClubPage,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
  },
});

createApp(App).use(router).mount("#app");
