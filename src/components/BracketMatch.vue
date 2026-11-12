<script setup>
import { computed } from "vue";
import TeamName from "@/components/TeamName.vue";
import { getTeam, getWinner, getScore, formatDate } from "@/data/helpers.js";

const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
});

const winner = computed(() => getWinner(props.match));

const rows = computed(() => {
  return [props.match.teamA, props.match.teamB].map((id) => {
    return {
      id: id,
      team: getTeam(id),
      score: getScore(props.match, id),
    };
  });
});
</script>

<template>
  <article class="bmatch">
    <p class="bmatch-info">{{ formatDate(match.date) }} · {{ match.format }}</p>
    <ul class="bmatch-teams">
      <li
        v-for="row in rows"
        :key="row.id"
        class="bmatch-team"
        :class="{ 'is-winner': winner === row.id, 'is-loser': winner && winner !== row.id }"
      >
        <img class="bmatch-logo" :src="row.team.logo" alt="" width="28" height="28" loading="lazy">
        <span class="bmatch-name">
          <TeamName :team="row.team" /><span v-if="winner === row.id" class="visually-hidden"> (winner)</span>
        </span>
        <span class="bmatch-score">{{ row.score }}</span>
      </li>
    </ul>
  </article>
</template>

<style>
.bmatch {
  border: 2px solid rgb(var(--purple));
  background-color: rgb(var(--panel));
}

.bmatch-info {
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--white) / 0.7);
}

.bmatch-team {
  display: grid;
  grid-template-columns: 28px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-top: 1px solid rgb(var(--line) / 0.1);
}

.bmatch-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.bmatch-name {
  font-family: var(--font-display);
  font-size: 14px;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bmatch-score {
  min-width: 32px;
  padding: 2px 6px;
  font-family: var(--font-display);
  font-size: 15px;
  text-align: center;
  background-color: rgb(var(--line) / 0.08);
}

.bmatch-team.is-winner .bmatch-score {
  background-color: rgb(var(--purple));
}

.bmatch-team.is-loser {
  color: rgb(var(--white) / 0.62);
}

.bmatch-team.is-loser .bmatch-logo {
  opacity: 0.4;
}
</style>