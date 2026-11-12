import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TournamentView from "../views/TournamentView.vue";
import ChampionsView from "../views/ChampionsView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tournament/:id",
      name: "tournament",
      component: TournamentView,
    },
    {
      path: "/champions",
      name: "champions",
      component: ChampionsView,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;