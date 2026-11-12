<script setup>
import { ref, computed, watch } from "vue";
import { RouterView, useRoute } from "vue-router";
import { getTournament } from "@/data/helpers.js";
import TickerFrame from "@/components/TickerFrame.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";

const route = useRoute();
const main = ref(null);

watch(
  () => route.path,
  () => {
    main.value.focus({ preventScroll: true });
  },
);
const tickerText = computed(() => {
  const tournament = getTournament(route.params.id);
  return tournament ? tournament.ticker : "SGL";
});
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <TickerFrame :text="tickerText" />

  <div class="site">
    <SiteHeader />

    <main id="main" ref="main" class="site-main" tabindex="-1">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>

    <SiteFooter />
  </div>
</template>

<style>
.site {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: var(--frame);
}

@media (max-width: 767px) {
  .site {
    padding: var(--frame) 0;
  }
}

.site-main {
  flex: 1;
}

.site-main:focus {
  outline: none;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>