<script setup>
import { ref } from "vue";
import TeamRoster from "@/components/TeamRoster.vue";
import TeamResults from "@/components/TeamResults.vue";

defineProps({
  tournament: {
    type: Object,
    required: true,
  },
});

const dialog = ref(null);
const selectedTeam = ref(null);

function open(team) {
  selectedTeam.value = team;
  dialog.value.showModal();
  document.body.classList.add("is-locked");
}

function close() {
  dialog.value.close();
}

function onClose() {
  document.body.classList.remove("is-locked");
}

function onDialogClick(event) {
  if (event.target === dialog.value) {
    close();
  }
}

defineExpose({ open });
</script>

<template>
  <dialog ref="dialog" class="team-dialog" aria-labelledby="team-dialog-title" @click="onDialogClick" @close="onClose">
    <div v-if="selectedTeam" class="team-dialog-inner">
      <div class="team-dialog-head">
        <img :src="selectedTeam.logo" alt="" width="64" height="64">
        <h3 id="team-dialog-title" class="team-dialog-title">{{ selectedTeam.name }}</h3>
        <button type="button" class="team-dialog-close" aria-label="Close" @click="close">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <h4 class="team-dialog-label">Roster</h4>
      <TeamRoster :team="selectedTeam" />

      <h4 class="team-dialog-label">{{ tournament.shortName }} results</h4>
      <TeamResults :tournament-id="tournament.id" :team-id="selectedTeam.id" />
    </div>
  </dialog>
</template>

<style>
.team-dialog {
  width: min(560px, 100% - 32px);
  max-height: calc(100vh - 64px);
  padding: 0;
  border: 3px solid rgb(var(--purple));
  background-color: rgb(var(--panel));
  color: rgb(var(--white));
}

.team-dialog::backdrop {
  background-color: rgb(0 0 0 / 0.75);
}

.team-dialog-inner {
  padding: 24px;
}

.team-dialog-head {
  display: grid;
  grid-template-columns: 64px 1fr auto;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.team-dialog-head img {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.team-dialog-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 28px;
  line-height: 1.05;
  text-transform: uppercase;
}

.team-dialog-close {
  width: 44px;
  height: 44px;
  border: 2px solid rgb(var(--purple));
  background: none;
  color: rgb(var(--white));
  font-size: 20px;
  cursor: pointer;
}

.team-dialog-close:hover {
  background-color: rgb(var(--purple));
}

.team-dialog-label {
  margin: 24px 0 8px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--white) / 0.7);
}

.team-dialog-head + .team-dialog-label {
  margin-top: 0;
}
</style>