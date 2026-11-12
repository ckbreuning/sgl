<script setup>
// https://vuejs.org/guide/components/provide-inject.html#inject
import { inject } from "vue";

defineProps({
  team: {
    type: Object,
    required: true,
  },
});

const openTeam = inject("openTeam", null);
</script>

<template>
  <button v-if="openTeam" type="button" class="team-link" @click="openTeam(team)">
    {{ team.name }}
  </button>
  <template v-else>{{ team.name }}</template>
</template>

<style>
.team-link {
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.15s ease, color 0.15s ease;
}

.team-link:hover {
  text-decoration-color: rgb(var(--purple-light));
}
</style>