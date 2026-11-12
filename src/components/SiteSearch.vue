<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import CountryFlag from "@/components/CountryFlag.vue";
import { getSearchIndex } from "@/data/helpers.js";

const dialog = ref(null);
const input = ref(null);
const query = ref("");

const index = getSearchIndex();

const results = computed(() => {
  const text = query.value.trim().toLowerCase();
  if (text === "") {
    return [];
  }
  return index.filter((item) => item.name.toLowerCase().includes(text)).slice(0, 8);
});

function openSearch() {
  query.value = "";
  dialog.value.showModal();
  document.body.classList.add("is-locked");
  input.value.focus();
}

function closeSearch() {
  dialog.value.close();
}

function onClose() {
  document.body.classList.remove("is-locked");
}

function onDialogClick(event) {
  if (event.target === dialog.value) {
    closeSearch();
  }
}
</script>

<template>
  <button type="button" class="nav-link search-button" @click="openSearch">
    <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
    <span class="nav-text">Search teams and players</span>
  </button>

  <dialog ref="dialog" class="search-dialog" aria-labelledby="search-title" @click="onDialogClick" @close="onClose">
    <div class="search-inner">
      <div class="search-head">
        <h2 id="search-title" class="search-title">Search</h2>
        <button type="button" class="team-dialog-close" aria-label="Close" @click="closeSearch">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <form role="search" class="search-form" @submit.prevent>
        <label for="search-input" class="visually-hidden">Search teams, players and coaches</label>
        <i class="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
        <input
          id="search-input"
          ref="input"
          v-model="query"
          class="search-input"
          type="text"
          placeholder="Team, player or coach"
          autocomplete="off"
        >
      </form>

      <p class="search-status" role="status">
        <template v-if="query.trim() === ''">Type a name to search.</template>
        <template v-else-if="results.length === 0">No teams or players match "{{ query }}".</template>
        <template v-else>{{ results.length }} {{ results.length === 1 ? "result" : "results" }}</template>
      </p>

      <ul v-if="results.length" class="search-results">
        <li v-for="item in results" :key="item.id">
          <RouterLink :to="item.to" class="search-result" @click="closeSearch">
            <span class="search-result-icon">
              <img v-if="item.logo" :src="item.logo" alt="" width="32" height="32">
              <CountryFlag v-else :country="item.country" />
            </span>
            <span class="search-result-text">
              <span class="search-result-name">{{ item.name }}</span>
              <span class="search-result-detail">{{ item.type }} · {{ item.detail }}</span>
            </span>
            <i class="fa-solid fa-arrow-right search-result-arrow" aria-hidden="true"></i>
          </RouterLink>
        </li>
      </ul>
    </div>
  </dialog>
</template>

<style>
.nav-link.search-button {
  display: flex;
  line-height: inherit;
  align-items: center;
  gap: 8px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  background: none;
  cursor: pointer;
}

.search-dialog {
  width: min(560px, 100% - 32px);
  max-height: calc(100vh - 64px);
  margin-top: 12vh;
  padding: 0;
  border: 3px solid rgb(var(--purple));
  background-color: rgb(var(--panel));
  color: rgb(var(--white));
}

.search-dialog::backdrop {
  background-color: rgb(0 0 0 / 0.75);
}

.search-inner {
  padding: 24px;
}

.search-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.search-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 28px;
  text-transform: uppercase;
}

.search-form {
  position: relative;
  margin-top: 20px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 16px;
  color: rgb(var(--white) / 0.6);
  transform: translateY(-50%);
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 46px;
  border: 2px solid rgb(var(--purple));
  background-color: rgb(var(--black));
  color: rgb(var(--white));
  font-family: var(--font-body);
  font-size: 18px;
}

.search-input:focus-visible {
  outline: 2px solid rgb(var(--purple-text));
  outline-offset: 2px;
}

.search-status {
  margin-top: 12px;
  font-size: 15px;
  color: rgb(var(--white) / 0.7);
}

.search-results {
  margin-top: 8px;
}

.search-result {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 10px 8px;
  border-top: 1px solid rgb(var(--line) / 0.1);
  color: rgb(var(--white));
  text-decoration: none;
}

.search-result:hover,
.search-result:focus-visible {
  background-color: rgb(var(--purple) / 0.35);
}

.search-result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-result-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.search-result-icon .flag {
  width: 24px;
  height: 18px;
  margin-right: 0;
}

.search-result-text {
  display: flex;
  flex-direction: column;
}

.search-result-name {
  font-family: var(--font-display);
  font-size: 17px;
}

.search-result-detail {
  font-size: 14px;
  color: rgb(var(--white) / 0.65);
}

.search-result-arrow {
  color: rgb(var(--purple-text));
  transition: transform 0.2s ease;
}

.search-result:hover .search-result-arrow {
  transform: translateX(4px);
}

@media (min-width: 900px) {
  .nav-link.search-button {
    min-width: 230px;
    margin-left: 8px;
    padding: 6px 14px;
    border: 2px solid rgb(var(--purple));
    background-color: rgb(var(--black) / 0.6);
    color: rgb(var(--white) / 0.7);
    font-family: var(--font-body);
    font-size: 15px;
    letter-spacing: 0;
    text-transform: none;
  }

  .nav-link.search-button:hover {
    border-color: rgb(var(--purple-light));
    color: rgb(var(--white));
  }
}
</style>