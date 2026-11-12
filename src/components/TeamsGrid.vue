<script setup>
import { ref, computed, inject } from "vue";
import SectionTitle from "@/components/SectionTitle.vue";
import { getSeasonTeams } from "@/data/helpers.js";

const props = defineProps({
  tournament: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const openTeam = inject("openTeam");
const query = ref("");

const teams = computed(() => getSeasonTeams(props.tournament));

const results = computed(() => {
  const text = query.value.trim().toLowerCase();

  return teams.value
    .map((team) => {
      const people = team.players.map((player) => player.name);
      if (team.coach) {
        people.push(team.coach.name);
      }
      const matches = text === "" ? [] : people.filter((name) => name.toLowerCase().includes(text));
      const teamMatches = text === "" || team.name.toLowerCase().includes(text);
      return { team: team, matches: matches, show: teamMatches || matches.length > 0 };
    })
    .filter((item) => item.show);
});
</script>

<template>
  <div class="teams-head">
    <SectionTitle :title="title" :tags="[tournament.edition, tournament.shortName]" />

    <div class="team-filter">
      <label for="team-filter-input" class="visually-hidden">Find a team or player</label>
      <div class="team-filter-field">
        <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        <input
          id="team-filter-input"
          v-model="query"
          class="team-filter-input"
          type="text"
          placeholder="Find a team or player"
          autocomplete="off"
        >
      </div>
      <p class="team-filter-status" role="status">
        <template v-if="query.trim() && results.length === 0">No teams or players match "{{ query }}".</template>
        <template v-else-if="query.trim()">{{ results.length }} {{ results.length === 1 ? "team" : "teams" }}</template>
      </p>
    </div>
  </div>

  <ul class="teams-grid">
    <li v-for="item in results" :key="item.team.id">
      <button type="button" class="team-card" @click="openTeam(item.team)">
        <span class="team-card-logo">
          <img :src="item.team.logo" alt="" width="120" height="120" loading="lazy">
        </span>
        <span class="team-card-name">{{ item.team.name }}</span>
        <span v-if="item.matches.length" class="team-card-match">
          <i class="fa-solid fa-user" aria-hidden="true"></i>
          {{ item.matches.join(", ") }}
        </span>
      </button>
    </li>
  </ul>
</template>

<style>
.teams-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 32px;
  margin-bottom: 44px;
}

.team-filter {
  position: relative;
  flex: 1 1 280px;
  max-width: 420px;
}

.team-filter-field {
  position: relative;
}

.team-filter-field i {
  position: absolute;
  top: 50%;
  left: 16px;
  color: rgb(var(--white) / 0.6);
  transform: translateY(-50%);
}

.team-filter-input {
  width: 100%;
  padding: 14px 16px 14px 46px;
  border: 2px solid rgb(var(--purple));
  background-color: rgb(var(--black));
  color: rgb(var(--white));
  font-family: var(--font-body);
  font-size: 18px;
}

.team-filter-input::placeholder {
  color: rgb(var(--white) / 0.5);
}

.team-filter-input:focus-visible {
  outline: 2px solid rgb(var(--purple-text));
  outline-offset: 2px;
}

.team-filter-status {
  position: absolute;
  margin-top: 6px;
  font-size: 15px;
  color: rgb(var(--white) / 0.7);
}

.team-card-match {
  margin-top: 6px;
  padding: 4px 8px;
  align-self: center;
  background-color: rgb(var(--purple));
  font-family: var(--font-display);
  font-size: 13px;
}

.teams-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
  gap: 24px;
}

.team-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  color: rgb(var(--white));
  cursor: pointer;
}

.team-card-logo {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  border: 3px solid rgb(var(--purple));
  background-color: rgb(var(--panel) / 0.9);
}

.team-card-logo img {
  position: absolute;
  top: 18%;
  left: 22%;
  width: 56%;
  height: 64%;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.team-card:hover .team-card-logo {
  border-color: rgb(var(--purple-light));
}

.team-card:hover .team-card-logo img {
  transform: scale(1.06);
}

.team-card-name {
  margin-top: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgb(var(--line) / 0.6);
  font-family: var(--font-display);
  font-size: 15px;
  text-align: center;
  text-transform: uppercase;
}
</style>