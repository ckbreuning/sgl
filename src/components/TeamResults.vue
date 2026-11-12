<script setup>
import { computed } from "vue";
import { getTeamMatches, getTeam, getWinner, getScore, getStageName } from "@/data/helpers.js";

const props = defineProps({
  tournamentId: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
});

const results = computed(() => {
  return getTeamMatches(props.tournamentId, props.teamId).map((match) => {
    const opponentId = match.teamA === props.teamId ? match.teamB : match.teamA;
    return {
      id: match.id,
      stage: getStageName(match),
      opponent: getTeam(opponentId),
      won: getWinner(match) === props.teamId,
      score: getScore(match, props.teamId) + "–" + getScore(match, opponentId),
    };
  });
});
</script>

<template>
  <ul class="team-results">
    <li v-for="result in results" :key="result.id" class="team-result">
      <span class="team-result-tag" :class="result.won ? 'is-won' : 'is-lost'" aria-hidden="true">
        {{ result.won ? "W" : "L" }}
      </span>
      <span class="team-result-text">
        <span class="team-result-stage">{{ result.stage }}</span>
        <span class="visually-hidden">{{ result.won ? "Won" : "Lost" }} </span>vs {{ result.opponent.name }}
      </span>
      <span class="team-result-score">{{ result.score }}</span>
    </li>
  </ul>
</template>

<style>
.team-result {
  display: grid;
  grid-template-columns: 28px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-top: 1px solid rgb(var(--line) / 0.1);
  font-size: 16px;
}

.team-result-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  font-family: var(--font-display);
  font-size: 14px;
}

.team-result-tag.is-won {
  background-color: rgb(var(--purple));
}

.team-result-tag.is-lost {
  border: 1px solid rgb(var(--line) / 0.3);
  color: rgb(var(--white) / 0.7);
}

.team-result-stage {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--white) / 0.6);
}

.team-result-score {
  font-family: var(--font-display);
}
</style>