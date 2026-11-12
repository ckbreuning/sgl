<script setup>
import CountryFlag from "@/components/CountryFlag.vue";

defineProps({
  team: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <ul class="roster">
    <li v-for="player in team.players" :key="player.name" class="roster-player">
      <span class="roster-name"><CountryFlag :country="player.country" />{{ player.name }}</span>
      <img
        v-if="player.org"
        class="roster-org"
        :src="player.org.logo"
        :alt="player.org.name"
        width="16"
        height="24"
      >
      <span v-if="player.note" class="roster-note">{{ player.note }}</span>
    </li>
    <li v-if="team.coach" class="roster-player">
      <span class="roster-name"><CountryFlag :country="team.coach.country" />{{ team.coach.name }}</span>
      <span class="roster-note">Coach</span>
    </li>
  </ul>
</template>

<style>
.roster-player {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
  padding: 8px 0;
  border-top: 1px solid rgb(var(--line) / 0.1);
}

.roster-name {
  font-family: var(--font-display);
  font-size: 18px;
}

.roster-name .flag {
  width: 1.2em;
  height: 0.9em;
  margin-right: 0.3em;
  vertical-align: -0.12em;
}

.roster-org {
  align-self: center;
  width: auto;
  height: 22px;
}

.roster-note {
  padding: 2px 8px;
  background-color: rgb(var(--slate));
  font-size: 13px;
  font-weight: 600;
}
</style>