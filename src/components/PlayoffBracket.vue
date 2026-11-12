<script setup>
import { computed } from "vue";
import BracketMatch from "@/components/BracketMatch.vue";
import { getMatches, getChampion } from "@/data/helpers.js";

const props = defineProps({
  tournament: {
    type: Object,
    required: true,
  },
});

const playoffMatches = computed(() => getMatches(props.tournament.id).filter((match) => match.stage !== "group"));
const champion = computed(() => getChampion(props.tournament.id));

function bySlot(slot) {
  return playoffMatches.value.find((match) => match.slot === slot);
}

const rounds = computed(() => {
  const list = [
    { id: "qf", title: "Quarterfinals", matches: [bySlot("QF1"), bySlot("QF2")] },
    { id: "sf", title: "Semifinals", matches: [bySlot("SF1"), bySlot("SF2")] },
    { id: "gf", title: "Grand final", matches: [bySlot("GF")] },
  ];
  return list.map((round) => {
    return {
      id: round.id,
      title: round.title,
      matches: round.matches.filter((match) => match),
    };
  });
});
</script>

<template>
  <div class="bracket-scroll" tabindex="0" role="region" aria-label="Playoff bracket, scrolls sideways on small screens">
    <ol class="bracket">
      <li v-for="round in rounds" :key="round.id" class="bracket-round" :class="'bracket-round-' + round.id">
        <h3 class="bracket-title">{{ round.title }}</h3>
        <ul class="bracket-matches">
          <li v-for="match in round.matches" :key="match.id" class="bracket-slot">
            <BracketMatch :match="match" />
            <p v-if="round.id === 'gf' && champion" class="bracket-champion">
              <span class="bracket-champion-label">Champion</span>
              <img :src="champion.logo" alt="" width="32" height="32">
              {{ champion.name }}
            </p>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<style>
.bracket-scroll {
  overflow-x: auto;
  padding-bottom: 12px;
}

.bracket {
  display: grid;
  grid-template-columns: repeat(3, minmax(230px, 1fr));
  column-gap: 48px;
  min-width: 800px;
}

.bracket-round {
  display: flex;
  flex-direction: column;
}

.bracket-title {
  margin-bottom: 8px;
  padding: 6px 12px;
  background-color: rgb(var(--slate));
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
}

.bracket-round-gf .bracket-title {
  background-color: rgb(var(--purple));
}

.bracket-matches {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.bracket-slot {
  position: relative;
  padding: 16px 0;
}

.bracket-round-qf .bracket-slot::after,
.bracket-round-sf .bracket-slot::after,
.bracket-round-gf .bracket-slot::before,
.bracket-round-sf .bracket-matches::after {
  content: "";
  position: absolute;
  border-color: rgb(var(--purple-light));
  border-style: solid;
  border-width: 0;
}

.bracket-round-qf .bracket-slot::after {
  top: 50%;
  right: -48px;
  width: 48px;
  border-top-width: 2px;
}

.bracket-round-sf .bracket-slot::after {
  top: 50%;
  right: -24px;
  width: 24px;
  border-top-width: 2px;
}

.bracket-round-sf .bracket-matches::after {
  top: 25%;
  bottom: 25%;
  right: -24px;
  border-right-width: 2px;
}

.bracket-round-gf .bracket-slot::before {
  top: 50%;
  left: -24px;
  width: 24px;
  border-top-width: 2px;
}

.bracket-round-gf .bmatch {
  border-width: 3px;
}

.bracket-champion {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 18px;
  text-transform: uppercase;
}

.bracket-champion img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.bracket-champion-label {
  padding: 3px 8px;
  background-color: rgb(var(--purple));
  font-size: 12px;
  letter-spacing: 0.06em;
}
</style>