<script setup>
import { ref, computed, provide, onMounted, nextTick } from "vue";
import { useRoute, RouterLink } from "vue-router";
import SectionTitle from "@/components/SectionTitle.vue";
import MatchCard from "@/components/MatchCard.vue";
import GroupView from "@/components/GroupView.vue";
import PlayoffBracket from "@/components/PlayoffBracket.vue";
import TeamsGrid from "@/components/TeamsGrid.vue";
import ProductionList from "@/components/ProductionList.vue";
import TeamDialog from "@/components/TeamDialog.vue";
import {
  getTournament,
  getMatches,
  getChampion,
  getSeasonTeams,
  getTeam,
  formatDate,
  formatEuro,
} from "@/data/helpers.js";

const route = useRoute();

const tournament = computed(() => getTournament(route.params.id));
const seasonMatches = computed(() => getMatches(tournament.value.id));
const champion = computed(() => getChampion(tournament.value.id));
const teamCount = computed(() => getSeasonTeams(tournament.value).length);

const teamDialog = ref(null);

function openTeam(team) {
  teamDialog.value.open(team);
}

provide("openTeam", openTeam);

onMounted(() => {
  const team = getTeam(route.query.team);
  if (tournament.value && team) {
    openTeam(team);
  }
});

const tabs = [
  { id: "matches", label: "Matches", title: "Results" },
  { id: "groups", label: "Groups", title: "Groups" },
  { id: "playoffs", label: "Playoffs", title: "Playoffs" },
  { id: "teams", label: "Teams", title: "The Teams" },
  { id: "production", label: "Production", title: "Production" },
];

function startTab() {
  const fromUrl = tabs.find((tab) => tab.id === route.query.tab);
  return fromUrl ? fromUrl.id : "matches";
}

const activeTab = ref(startTab());

function selectTab(id) {
  activeTab.value = id;
  document.getElementById("tab-" + id).scrollIntoView({ block: "nearest", inline: "nearest" });

  const anchor = document.getElementById("season-tabs-anchor");
  if (anchor.getBoundingClientRect().top < 0) {
    anchor.scrollIntoView();
  }
}

function onTabKey(event, index) {
  let next = null;

  if (event.key === "ArrowRight") {
    next = (index + 1) % tabs.length;
  } else if (event.key === "ArrowLeft") {
    next = (index - 1 + tabs.length) % tabs.length;
  } else if (event.key === "Home") {
    next = 0;
  } else if (event.key === "End") {
    next = tabs.length - 1;
  }

  if (next !== null) {
    event.preventDefault();
    selectTab(tabs[next].id);
    document.getElementById("tab-" + tabs[next].id).focus();
  }
}

const activeFilter = ref("all");

const filters = computed(() => {
  const list = [{ id: "all", label: "All" }];
  for (const group of tournament.value.groups) {
    list.push({ id: group.id, label: group.name });
  }
  list.push({ id: "playoffs", label: "Playoffs" });
  return list;
});

const filteredMatches = computed(() => {
  if (activeFilter.value === "all") {
    return seasonMatches.value;
  }
  if (activeFilter.value === "playoffs") {
    return seasonMatches.value.filter((match) => match.stage !== "group");
  }
  return seasonMatches.value.filter((match) => match.group === activeFilter.value);
});

function setFilter(id) {
  activeFilter.value = id;
}

const shortcut = computed(() => {
  const group = tournament.value.groups.find((item) => item.id === activeFilter.value);
  if (group) {
    return {
      question: "Looking for the table?",
      text: "See the " + group.name + " standings",
      tab: "groups",
      target: "group-title-" + group.id,
    };
  }
  if (activeFilter.value === "playoffs") {
    return {
      question: "Looking for the bracket?",
      text: "See the playoff bracket",
      tab: "playoffs",
      target: null,
    };
  }
  return null;
});

async function followShortcut() {
  const target = shortcut.value.target;
  selectTab(shortcut.value.tab);
  if (target) {
    await nextTick();
    document.getElementById(target).scrollIntoView({ block: "center" });
  }
}
</script>

<template>
  <div v-if="tournament" class="season">
    <section class="season-hero">
      <div class="container">
        <RouterLink to="/" class="back-link">← All seasons</RouterLink>

        <SectionTitle level="h1" :title="tournament.shortName" :tags="['SGL', tournament.edition]" />

        <dl class="season-facts">
          <div>
            <dt>Dates</dt>
            <dd>{{ formatDate(tournament.startDate) }} – {{ formatDate(tournament.endDate) }}</dd>
          </div>
          <div>
            <dt>Prize pool</dt>
            <dd>{{ formatEuro(tournament.prizePool) }}</dd>
          </div>
          <div>
            <dt>Teams</dt>
            <dd>{{ teamCount }}</dd>
          </div>
          <div v-if="champion" class="season-champion">
            <dt>Champion</dt>
            <dd>
              <img :src="champion.logo" alt="" width="32" height="32">
              {{ champion.name }}
            </dd>
          </div>
        </dl>

        <p v-if="tournament.liquipedia" class="season-source">
          <a :href="tournament.liquipedia" target="_blank" rel="noopener">
            Full results on Liquipedia<span class="visually-hidden"> (opens in a new tab)</span>
            <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </section>

    <div id="season-tabs-anchor" class="season-tabs-anchor"></div>
    <div class="season-tabs">
      <div class="container">
        <div class="tabs" role="tablist" aria-label="Season sections">
          <button
            v-for="(tab, index) in tabs"
            :id="'tab-' + tab.id"
            :key="tab.id"
            type="button"
            role="tab"
            class="tab"
            :class="{ 'is-active': activeTab === tab.id }"
            :aria-selected="activeTab === tab.id"
            :aria-controls="'panel-' + tab.id"
            :tabindex="activeTab === tab.id ? 0 : -1"
            @click="selectTab(tab.id)"
            @keydown="onTabKey($event, index)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <section
        v-for="tab in tabs"
        v-show="activeTab === tab.id"
        :id="'panel-' + tab.id"
        :key="tab.id"
        class="season-panel"
        role="tabpanel"
        :aria-labelledby="'tab-' + tab.id"
        tabindex="0"
      >
        <SectionTitle v-if="tab.id !== 'teams'" :title="tab.title" :tags="[tournament.edition, tournament.shortName]" />

        <template v-if="tab.id === 'matches'">
          <div class="filter" role="group" aria-label="Show matches from">
            <button
              v-for="filter in filters"
              :key="filter.id"
              type="button"
              class="filter-button"
              :class="{ 'is-active': activeFilter === filter.id }"
              :aria-pressed="activeFilter === filter.id"
              @click="setFilter(filter.id)"
            >
              {{ filter.label }}
            </button>
          </div>

          <p class="filter-count" role="status">
            Showing {{ filteredMatches.length }} {{ filteredMatches.length === 1 ? "match" : "matches" }}
          </p>

          <button v-if="shortcut" type="button" class="standings-link" @click="followShortcut">
            <span>
              <span class="standings-link-label">{{ shortcut.question }}</span>
              {{ shortcut.text }}
            </span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>

          <ul class="match-list">
            <li v-for="match in filteredMatches" :key="match.id">
              <MatchCard :match="match" :timezone="tournament.timezone" />
            </li>
          </ul>
        </template>

        <div v-else-if="tab.id === 'groups'" class="panel-body">
          <GroupView v-for="group in tournament.groups" :key="group.id" :tournament="tournament" :group="group" />
        </div>

        <div v-else-if="tab.id === 'playoffs'" class="panel-body">
          <PlayoffBracket :tournament="tournament" />
        </div>

        <TeamsGrid v-else-if="tab.id === 'teams'" :tournament="tournament" :title="tab.title" />

        <div v-else-if="tab.id === 'production'" class="panel-body">
          <ProductionList :tournament="tournament" />
        </div>
      </section>
    </div>

    <TeamDialog ref="teamDialog" :tournament="tournament" />
  </div>

  <div v-else class="container season-missing">
    <h1 class="season-missing-title">Season not found</h1>
    <p>There is no SGL season at this address.</p>
    <RouterLink to="/">← All seasons</RouterLink>
  </div>
</template>

<style>
.season-hero {
  padding: 32px 0 40px;
}

.back-link {
  display: inline-block;
  margin-bottom: 24px;
  font-weight: 600;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.season-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 24px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgb(var(--line) / 0.15);
}

.season-facts dt {
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--white) / 0.65);
}

.season-facts dd {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
  font-family: var(--font-display);
  font-size: 22px;
}

.season-champion dd img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.season-source {
  margin-top: 24px;
  font-size: 16px;
  font-weight: 600;
}

.season-source a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.season-source i {
  font-size: 13px;
}

.season-tabs-anchor {
  scroll-margin-top: var(--frame);
}

.season-tabs {
  position: sticky;
  top: 0;
  z-index: 30;
  border-top: 1px solid rgb(var(--line) / 0.12);
  border-bottom: 1px solid rgb(var(--line) / 0.12);
  background-color: rgb(var(--black) / 0.92);
  backdrop-filter: blur(6px);
}

@media (min-width: 768px) {
  .season-tabs {
    top: var(--frame);
  }
}

.tabs {
  display: flex;
  gap: 4px;
  overflow-x: auto;
}

.tab {
  flex-shrink: 0;
  margin: 8px 0;
  padding: 12px 18px;
  border: 2px solid transparent;
  background: none;
  color: rgb(var(--white) / 0.8);
  font-family: var(--font-display);
  font-size: 16px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.tab:hover {
  color: rgb(var(--white));
  border-color: rgb(var(--purple));
  background-color: rgb(var(--purple) / 0.2);
}

.tab.is-active {
  color: rgb(var(--white));
  border-color: rgb(var(--purple));
  background-color: rgb(var(--purple));
}

.tab:focus-visible {
  outline-offset: 2px;
}

.standings-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  max-width: 520px;
  margin-bottom: 32px;
  padding: 14px 18px;
  border: 2px solid rgb(var(--purple));
  background-color: rgb(var(--purple) / 0.2);
  color: rgb(var(--white));
  font-family: var(--font-display);
  font-size: 18px;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.standings-link-label {
  display: block;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  color: rgb(var(--white) / 0.75);
}

.standings-link i {
  color: rgb(var(--purple-text));
  transition: transform 0.2s ease;
}

.standings-link:hover {
  background-color: rgb(var(--purple) / 0.4);
  box-shadow: 6px 6px 0 rgb(var(--purple));
  transform: translate(-3px, -3px);
}

.standings-link:hover i {
  transform: translateX(6px);
}

.season-panel {
  padding-top: 48px;
  animation: panel-in 0.25s ease;
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.season-panel:focus-visible {
  outline-offset: 8px;
}

.panel-body {
  margin-top: 32px;
}

.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}

.filter-button {
  padding: 10px 16px;
  border: 2px solid rgb(var(--purple));
  background-color: transparent;
  color: rgb(var(--white));
  font-family: var(--font-display);
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
}

.filter-button:hover {
  background-color: rgb(var(--purple) / 0.3);
}

.filter-button.is-active {
  background-color: rgb(var(--purple));
}

.filter-count {
  margin: 16px 0 24px;
  font-size: 15px;
  color: rgb(var(--white) / 0.7);
}

.match-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 440px), 1fr));
  gap: 40px 32px;
}

.season-missing {
  padding-top: 64px;
}

.season-missing-title {
  margin-bottom: 12px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 40px;
}
</style>