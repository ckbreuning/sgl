<script setup>
import { RouterLink } from "vue-router";
import SectionTitle from "@/components/SectionTitle.vue";
import TeamRoster from "@/components/TeamRoster.vue";
import TeamResults from "@/components/TeamResults.vue";
import { tournaments } from "@/data/tournaments.js";
import { getChampion, getFinal, getPlacements, getTeam, getScore, formatDate, formatEuro } from "@/data/helpers.js";

const seasons = tournaments
  .filter((tournament) => getChampion(tournament.id))
  .map((tournament) => {
    const champion = getChampion(tournament.id);
    const final = getFinal(tournament.id);
    const runnerUpId = final.teamA === champion.id ? final.teamB : final.teamA;
    return {
      tournament: tournament,
      champion: champion,
      final: final,
      runnerUp: getTeam(runnerUpId),
      finalScore: getScore(final, champion.id) + "–" + getScore(final, runnerUpId),
      placements: getPlacements(tournament),
    };
  });
</script>

<template>
  <div class="champions">
    <section class="champions-intro">
      <div class="container">
        <SectionTitle level="h1" title="Champions" :tags="['SGL', 'Hall of fame']" />
        <p class="champions-lead">Every team that has lifted an SGL trophy, and how they got there.</p>
      </div>
    </section>

    <div class="container">
      <article v-for="season in seasons" :key="season.tournament.id" class="champion">
        <p class="champion-season">
          <RouterLink :to="'/tournament/' + season.tournament.id" class="tag champion-season-link">
            {{ season.tournament.name }}
          </RouterLink>
          <span class="champion-date">{{ formatDate(season.final.date) }}</span>
        </p>

        <div class="champion-hero">
          <div class="winner" aria-hidden="true">
            <span class="winner-outline">Winner</span>
            <span class="winner-fill">Winner</span>
          </div>

          <div class="champion-team">
            <img class="champion-logo" :src="season.champion.logo" alt="" width="200" height="200">
            <div>
              <h2 class="champion-name">{{ season.champion.name }}</h2>
              <p class="champion-final">
                Beat {{ season.runnerUp.name }} {{ season.finalScore }} in the grand final
              </p>
            </div>
          </div>
        </div>

        <div class="champion-grid">
          <section class="champion-block" :aria-labelledby="'roster-' + season.tournament.id">
            <h3 :id="'roster-' + season.tournament.id" class="champion-label">Roster</h3>
            <TeamRoster :team="season.champion" />
          </section>

          <section class="champion-block" :aria-labelledby="'road-' + season.tournament.id">
            <h3 :id="'road-' + season.tournament.id" class="champion-label">Road to the title</h3>
            <TeamResults :tournament-id="season.tournament.id" :team-id="season.champion.id" />
          </section>

          <section class="champion-block" :aria-labelledby="'standings-' + season.tournament.id">
            <h3 :id="'standings-' + season.tournament.id" class="champion-label">Final standings</h3>
            <ol class="placements">
              <li v-for="item in season.placements" :key="item.place" class="placement">
                <span class="placement-place">{{ item.place }}</span>
                <span class="placement-teams">
                  <span v-for="team in item.teams" :key="team.id" class="placement-team">
                    <img :src="team.logo" alt="" width="28" height="28" loading="lazy">
                    {{ team.name }}
                  </span>
                </span>
                <span v-if="item.amount" class="placement-prize">{{ formatEuro(item.amount) }}</span>
              </li>
            </ol>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>

<style>
.champions-intro {
  padding: 32px 0 48px;
}

.champions-lead {
  max-width: 560px;
  margin-top: 20px;
  font-size: 20px;
  color: rgb(var(--white) / 0.8);
}

.champion + .champion {
  margin-top: 96px;
}

.champion-season {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.champion-season-link {
  background-color: rgb(var(--purple));
  color: rgb(var(--white));
  text-decoration: none;
}

.champion-season-link:hover {
  background-color: rgb(var(--purple-light));
}

.champion-date {
  font-size: 15px;
  font-weight: 600;
  color: rgb(var(--white) / 0.7);
}

.champion-hero {
  position: relative;
  margin-top: 24px;
}

.winner {
  display: grid;
  margin-top: 0.45em;
  font-family: var(--font-display);
  font-size: clamp(48px, 14vw, 220px);
  line-height: 0.82;
  text-transform: uppercase;
}

.winner-outline,
.winner-fill {
  grid-area: 1 / 1;
  justify-self: start;
  padding: 0.06em 0.12em 0;
}

.winner-outline {
  color: transparent;
  -webkit-text-stroke: 2px rgb(var(--purple-light));
  opacity: 0.5;
  transform: translateY(-0.45em);
}

.winner-fill {
  position: relative;
  background-color: rgb(var(--purple));
  color: rgb(var(--white));
}

.champion-team {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
}

.champion-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.champion-name {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(40px, 7vw, 72px);
  line-height: 1;
  text-transform: uppercase;
}

.champion-final {
  margin-top: 8px;
  font-size: 19px;
  color: rgb(var(--white) / 0.8);
}

@media (min-width: 900px) {
  .champion-logo {
    width: 160px;
    height: 160px;
  }
}

.champion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 32px;
  margin-top: 56px;
}

.champion-block {
  padding: 20px;
  border: 3px solid rgb(var(--purple));
  background-color: rgb(var(--panel) / 0.9);
}

.champion-label {
  margin-bottom: 8px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--white) / 0.7);
}

.placement {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px 12px;
  padding: 10px 0;
  border-top: 1px solid rgb(var(--line) / 0.1);
}

.placement-place {
  font-family: var(--font-display);
  font-size: 18px;
  white-space: nowrap;
}

.placement-teams {
  grid-column: 1 / -1;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.placement-team {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 15px;
  text-transform: uppercase;
}

.placement-team img {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.placement-prize {
  font-family: var(--font-display);
  color: rgb(var(--purple-text));
}

.placement:first-child .placement-place {
  color: rgb(var(--purple-text));
}
</style>