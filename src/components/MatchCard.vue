<script setup>
import { computed } from "vue";
import CountryFlag from "@/components/CountryFlag.vue";
import TeamName from "@/components/TeamName.vue";
import { getTeam, getWinner, getStageName, getPlayerCountry, formatDate } from "@/data/helpers.js";

const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
  timezone: {
    type: String,
    default: "CEST",
  },
});

const teamA = computed(() => getTeam(props.match.teamA));
const teamB = computed(() => getTeam(props.match.teamB));
const winner = computed(() => getWinner(props.match));
const stageName = computed(() => getStageName(props.match));

const tagText = computed(() => {
  if (props.match.stage === "group") {
    return "Group " + props.match.group;
  }
  return "Playoffs";
});

const tagClass = computed(() => {
  if (props.match.stage === "group") {
    return "tag-group-" + props.match.group.toLowerCase();
  }
  return "tag-playoffs";
});

const hasDetails = computed(() => {
  return props.match.maps.length > 0 || props.match.note || props.match.standIns;
});

const detailsLabel = computed(() => {
  if (props.match.maps.length && props.match.standIns) {
    return "Maps and stand-ins";
  }
  if (props.match.maps.length) {
    return "Maps";
  }
  return "Note";
});

const scoreText = computed(() => {
  const match = props.match;

  if (match.forfeit) {
    return match.forfeit === match.teamA ? "FF – W" : "W – FF";
  }

  if (match.format === "BO1" && match.maps.length === 1) {
    return match.maps[0].scoreA + "–" + match.maps[0].scoreB;
  }

  return match.scoreA + "–" + match.scoreB;
});
</script>

<template>
  <article class="match">
    <h3 class="visually-hidden">{{ teamA.name }} vs {{ teamB.name }}, {{ stageName }}</h3>

    <div class="match-top">
      <span class="tag" :class="tagClass">{{ tagText }}</span>
      <span class="match-when">
        {{ formatDate(match.date) }} · {{ match.time }} {{ timezone }}
      </span>
    </div>

    <div class="match-card">
      <div class="match-teams">
        <img
          class="match-logo"
          :class="{ 'is-loser': winner && winner !== match.teamA }"
          :src="teamA.logo"
          alt=""
          width="96"
          height="96"
          loading="lazy"
        >
        <p class="match-score">
          <span class="visually-hidden">Score:</span>
          {{ scoreText }}
        </p>
        <img
          class="match-logo"
          :class="{ 'is-loser': winner && winner !== match.teamB }"
          :src="teamB.logo"
          alt=""
          width="96"
          height="96"
          loading="lazy"
        >
      </div>

      <p class="match-plates">
        <span :class="{ 'is-winner': winner === match.teamA }">
          <TeamName :team="teamA" /><span v-if="winner === match.teamA" class="visually-hidden"> (winner)</span>
        </span>
        <span class="match-plate-mid">{{ match.format }}</span>
        <span :class="{ 'is-winner': winner === match.teamB }">
          <TeamName :team="teamB" /><span v-if="winner === match.teamB" class="visually-hidden"> (winner)</span>
        </span>
      </p>
    </div>

    <p class="match-stage">{{ stageName }}</p>

    <details v-if="hasDetails" class="match-details">
      <summary>{{ detailsLabel }}</summary>

      <ul v-if="match.maps.length" class="match-maps">
        <li v-for="map in match.maps" :key="map.name">
          <span class="match-map-name">{{ map.name }}</span>
          <span>{{ map.scoreA }}–{{ map.scoreB }}</span>
        </li>
      </ul>

      <ul v-if="match.standIns" class="match-standins">
        <li v-for="standIn in match.standIns" :key="standIn.name">
          <span class="player"><CountryFlag :country="standIn.country" />{{ standIn.name }}</span> stood in for <span class="player"><CountryFlag :country="getPlayerCountry(standIn.team, standIn.replaces)" />{{ standIn.replaces }}</span> on {{ getTeam(standIn.team).name }}<template v-if="standIn.detail">, {{ standIn.detail }}</template>.
        </li>
      </ul>

      <p v-if="match.note" class="match-note">{{ match.note }}</p>
    </details>
  </article>
</template>

<style>
.match {
  display: flex;
  flex-direction: column;
}

.match-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.match-when {
  font-size: 15px;
  font-weight: 600;
  color: rgb(var(--white) / 0.75);
}

.tag-group-a {
  background-color: rgb(var(--group-a));
}

.tag-group-b {
  background-color: rgb(var(--group-b));
  color: rgb(var(--black));
}

.tag-group-c {
  background-color: rgb(var(--group-c));
  color: rgb(var(--black));
}

.tag-playoffs {
  background-color: rgb(var(--slate));
}

.match-card {
  border: 3px solid rgb(var(--purple));
  background-color: rgb(var(--panel) / 0.9);
}

.match-teams {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
}

.match-logo {
  justify-self: center;
  width: 72px;
  height: 72px;
  object-fit: contain;
}

.match-logo.is-loser {
  opacity: 0.35;
}

.match-score {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1;
  white-space: nowrap;
}

.match-plates {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  font-family: var(--font-display);
  font-size: 12px;
  line-height: 1.2;
  text-transform: uppercase;
  text-align: center;
}

.match-plates > span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 6px;
  background-color: rgb(var(--plate));
  color: rgb(var(--black));
}

.match-plates > .match-plate-mid {
  padding: 8px 14px;
  background-color: rgb(var(--purple));
  color: rgb(var(--white));
}

.match-plates > .is-winner {
  background-color: rgb(var(--white));
}

.match-stage {
  margin-top: 6px;
  padding: 6px 12px;
  background-color: rgb(var(--purple));
  font-family: var(--font-display);
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
}

.match-details {
  margin-top: 6px;
  border: 1px solid rgb(var(--line) / 0.15);
  font-size: 15px;
}

.match-details summary {
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 600;
}

.match-maps {
  padding: 0 12px 8px;
}

.match-maps li {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-top: 1px solid rgb(var(--line) / 0.08);
}

.match-map-name {
  color: rgb(var(--white) / 0.75);
}

.match-standins {
  padding: 0 12px 10px;
  color: rgb(var(--white) / 0.85);
}

.player {
  white-space: nowrap;
}

.match-standins li + li {
  margin-top: 6px;
}

.match-note {
  padding: 0 12px 10px;
  color: rgb(var(--white) / 0.75);
}

@media (min-width: 600px) {
  .match-logo {
    width: 96px;
    height: 96px;
  }

  .match-plates {
    font-size: 13px;
  }
}
</style>