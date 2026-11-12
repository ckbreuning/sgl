<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import CountryFlag from "@/components/CountryFlag.vue";
import { getTeam, getWinner, getScore, getStageName, formatDate } from "@/data/helpers.js";

const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
  tournament: {
    type: Object,
    required: true,
  },
  story: {
    type: String,
    default: "",
  },
});

const winner = computed(() => getWinner(props.match));

const sides = computed(() => {
  return [props.match.teamA, props.match.teamB].map((id) => {
    return {
      id: id,
      team: getTeam(id),
      score: getScore(props.match, id),
      won: winner.value === id,
    };
  });
});

const maps = computed(() => {
  return props.match.maps.map((map) => {
    return {
      name: map.name,
      scoreA: map.scoreA,
      scoreB: map.scoreB,
      winnerIsA: map.scoreA > map.scoreB,
    };
  });
});
</script>

<template>
  <section class="motd" aria-labelledby="motd-title">
    <p class="motd-tags">
      <span class="tag tag-playoffs">Playoffs</span>
      <span class="tag motd-stage">{{ getStageName(match) }}</span>
    </p>

    <div class="motd-board">
      <div
        v-for="(side, index) in sides"
        :key="side.id"
        class="motd-team"
        :class="['motd-team-' + (index === 0 ? 'a' : 'b'), { 'is-winner': side.won, 'is-loser': winner && !side.won }]"
      >
        <img class="motd-logo" :src="side.team.logo" alt="" width="140" height="140" loading="lazy">
        <p class="motd-name">
          {{ side.team.name }}<span v-if="side.won" class="visually-hidden"> (winner)</span>
        </p>
        <ul class="motd-roster">
          <li v-for="player in side.team.players" :key="player.name">
            <CountryFlag :country="player.country" />{{ player.name }}
          </li>
        </ul>
      </div>

      <div class="motd-centre">
        <h2 id="motd-title" class="motd-title">
          <span>Match</span>
          <span>of the</span>
          <span class="motd-title-big">Day</span>
        </h2>

        <p class="motd-score">
          <span class="visually-hidden">Final score: {{ sides[0].team.name }}</span>
          <span :class="{ 'is-high': sides[0].won }">{{ sides[0].score }}</span>
          <span class="motd-dash" aria-hidden="true">–</span>
          <span class="visually-hidden">{{ sides[1].team.name }}</span>
          <span :class="{ 'is-high': sides[1].won }">{{ sides[1].score }}</span>
        </p>

        <p class="motd-meta">{{ formatDate(match.date) }} | {{ match.format }}</p>
      </div>
    </div>

    <ul v-if="maps.length" class="motd-maps" aria-label="Maps">
      <li v-for="map in maps" :key="map.name" class="motd-map">
        <span class="motd-map-name">{{ map.name }}</span>
        <span class="motd-map-score">
          <span :class="{ 'is-high': map.winnerIsA }">{{ map.scoreA }}</span>–<span :class="{ 'is-high': !map.winnerIsA }">{{ map.scoreB }}</span>
        </span>
      </li>
    </ul>

    <div class="motd-footer">
      <p v-if="story" class="motd-story">{{ story }}</p>
      <RouterLink :to="'/tournament/' + tournament.id + '?tab=playoffs'" class="motd-link">
        See the full bracket
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </RouterLink>
    </div>
  </section>
</template>

<style>
.motd {
  position: relative;
  padding: 24px 16px;
  border: 3px solid rgb(var(--purple));
  background-color: rgb(var(--panel) / 0.9);
  background-image: radial-gradient(ellipse 60% 70% at 50% 40%, rgb(var(--purple-deep) / 0.45), transparent 70%);
}

.motd-tags {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.motd-tags .tag {
  font-size: 16px;
}

.motd-tags .motd-stage {
  background-color: rgb(var(--purple));
}

.motd-board {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "centre centre"
    "a b";
  gap: 24px 16px;
  margin-top: 16px;
}

.motd-centre {
  grid-area: centre;
  text-align: center;
}

.motd-team-a {
  grid-area: a;
}

.motd-team-b {
  grid-area: b;
}

.motd-title {
  display: flex;
  flex-direction: column;
  font-family: var(--font-tall);
  font-weight: 400;
  font-size: clamp(36px, 6vw, 64px);
  line-height: 0.9;
  text-transform: uppercase;
}

.motd-title-big {
  font-size: 1.9em;
  line-height: 0.85;
}

.motd-score {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  font-family: var(--font-display);
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1;
  color: rgb(var(--white) / 0.5);
}

.motd-score .is-high {
  color: rgb(var(--white));
}

.motd-dash {
  color: rgb(var(--purple-light));
}

.motd-meta {
  margin-top: 12px;
  font-family: var(--font-display);
  font-size: 20px;
}

.motd-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.motd-logo {
  width: 72px;
  height: 72px;
  object-fit: contain;
}

.motd-name {
  max-width: 100%;
  margin-top: 12px;
  overflow-wrap: anywhere;
  font-family: var(--font-display);
  font-size: 16px;
  line-height: 1.1;
  text-transform: uppercase;
}

.motd-roster li {
  white-space: nowrap;
}

.motd-roster {
  margin-top: 12px;
  font-family: var(--font-display);
  font-size: 13px;
  line-height: 1.9;
  text-transform: uppercase;
  color: rgb(var(--white) / 0.6);
}

.motd-team.is-loser .motd-logo {
  opacity: 0.45;
}

.motd-team.is-winner .motd-name {
  color: rgb(var(--purple-text));
}

.motd-maps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.motd-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 96px;
  padding: 8px 12px;
  border: 1px solid rgb(var(--line) / 0.15);
}

.motd-map-name {
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--white) / 0.7);
}

.motd-map-score {
  font-family: var(--font-display);
  font-size: 18px;
  color: rgb(var(--white) / 0.5);
}

.motd-map-score .is-high {
  color: rgb(var(--white));
}

.motd-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 32px;
  text-align: center;
}

.motd-story {
  max-width: 560px;
  font-size: 18px;
  color: rgb(var(--white) / 0.85);
}

.motd-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background-color: rgb(var(--purple));
  color: rgb(var(--white));
  font-family: var(--font-display);
  font-size: 18px;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.motd-link i {
  transition: transform 0.2s ease;
}

.motd-link:hover {
  background-color: rgb(var(--purple-light));
  box-shadow: 6px 6px 0 rgb(var(--purple-deep));
  transform: translate(-3px, -3px);
}

.motd-link:hover i {
  transform: translateX(6px);
}

@media (max-width: 599px) {
  .motd-roster {
    display: none;
  }

  .motd-story {
    font-size: 16px;
  }
}

@media (min-width: 900px) {
  .motd {
    padding: 28px 32px;
  }

  .motd-board {
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: "a centre b";
    align-items: center;
    gap: 32px;
  }

  .motd-logo {
    width: 104px;
    height: 104px;
  }

  .motd-name {
    font-size: 22px;
  }

  .motd-roster {
    font-size: 14px;
    line-height: 1.7;
  }
}
</style>