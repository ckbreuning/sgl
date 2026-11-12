<script setup>
import { computed } from "vue";
import BracketMatch from "@/components/BracketMatch.vue";
import TeamName from "@/components/TeamName.vue";
import { getGroupStandings, getMatches } from "@/data/helpers.js";

const props = defineProps({
  tournament: {
    type: Object,
    required: true,
  },
  group: {
    type: Object,
    required: true,
  },
});

const standings = computed(() => getGroupStandings(props.tournament, props.group.id));

const groupMatches = computed(() => {
  return getMatches(props.tournament.id).filter(
    (match) => match.stage === "group" && match.group === props.group.id,
  );
});

const openingMatches = computed(() => groupMatches.value.filter((match) => match.round === "opening"));
const winnersMatch = computed(() => groupMatches.value.find((match) => match.round === "winners"));
const eliminationMatch = computed(() => groupMatches.value.find((match) => match.round === "elimination"));

function resultClass(result) {
  if (result === "Semifinals") {
    return "is-semis";
  }
  if (result === "Eliminated") {
    return "is-out";
  }
  return "is-quarters";
}
</script>

<template>
  <section class="group" :aria-labelledby="'group-title-' + group.id">
    <h3 :id="'group-title-' + group.id" class="group-title">
      <span class="tag" :class="'tag-group-' + group.id.toLowerCase()">{{ group.name }}</span>
    </h3>

    <div class="group-layout">
      <div class="standings-wrap">
        <table class="standings">
          <caption class="visually-hidden">{{ group.name }} standings</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team</th>
              <th scope="col">W–L</th>
              <th scope="col">Maps</th>
              <th scope="col">Next</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in standings" :key="row.team.id" :class="resultClass(row.result)">
              <td class="standings-place">{{ row.place }}</td>
              <th scope="row" class="standings-team">
                <span class="standings-team-inner">
                  <img :src="row.team.logo" alt="" width="32" height="32" loading="lazy">
                  <TeamName :team="row.team" />
                </span>
              </th>
              <td>{{ row.wins }}–{{ row.losses }}</td>
              <td>{{ row.mapsWon }}–{{ row.mapsLost }}</td>
              <td><span class="standings-result">{{ row.result }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="gsl">
        <div class="gsl-col">
          <p class="gsl-label">Opening matches</p>
          <BracketMatch v-for="match in openingMatches" :key="match.id" :match="match" />
        </div>
        <div class="gsl-col">
          <p class="gsl-label">Winners match</p>
          <BracketMatch v-if="winnersMatch" :match="winnersMatch" />
          <p class="gsl-label">Elimination match</p>
          <BracketMatch v-if="eliminationMatch" :match="eliminationMatch" />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.group + .group {
  margin-top: 56px;
}

.group-title {
  margin-bottom: 16px;
  font-weight: 400;
}

.group-title .tag {
  font-size: 18px;
}

.group-layout {
  display: grid;
  gap: 32px;
}

@media (min-width: 1000px) {
  .group-layout {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.standings-wrap {
  overflow-x: auto;
}

.standings {
  width: 100%;
  min-width: 420px;
  border-collapse: collapse;
  border: 3px solid rgb(var(--purple));
  background-color: rgb(var(--panel) / 0.9);
  font-size: 16px;
}

.standings thead th {
  padding: 8px 10px;
  background-color: rgb(var(--purple));
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-align: left;
  text-transform: uppercase;
}

.standings td,
.standings tbody th {
  padding: 10px;
  border-top: 1px solid rgb(var(--line) / 0.1);
  text-align: left;
}

.standings td {
  white-space: nowrap;
}

.standings-place {
  width: 40px;
  font-family: var(--font-display);
  font-size: 22px;
}

.standings-team {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 15px;
  text-transform: uppercase;
}

.standings-team-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}

.standings-team img {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.standings-result {
  display: inline-block;
  padding: 3px 8px;
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.is-semis .standings-result {
  background-color: rgb(var(--purple));
}

.is-quarters .standings-result {
  background-color: rgb(var(--slate));
}

.is-out {
  color: rgb(var(--white) / 0.55);
}

.is-out img {
  opacity: 0.45;
}

.is-out .standings-result {
  border: 1px solid rgb(var(--line) / 0.25);
}

.gsl {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 600px) {
  .gsl {
    grid-template-columns: 1fr 1fr;
  }
}

.gsl-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gsl-label {
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(var(--white) / 0.7);
}

.gsl-col .bmatch + .gsl-label {
  margin-top: 12px;
}
</style>