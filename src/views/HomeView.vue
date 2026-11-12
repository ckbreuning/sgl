<script setup>
import SectionTitle from "@/components/SectionTitle.vue";
import SocialLinks from "@/components/SocialLinks.vue";
import MatchOfTheDay from "@/components/MatchOfTheDay.vue";
import { tournaments } from "@/data/tournaments.js";
import { RouterLink } from "vue-router";
import { getSeasonTeams, getChampion, getMatch, formatDate, formatEuro } from "@/data/helpers.js";
import shield from "@/assets/brand/sgl.webp";

const featuredSeason = tournaments.find((tournament) => tournament.featured);
const featuredMatch = featuredSeason ? getMatch(featuredSeason.featured.match) : null;
</script>

<template>
  <div class="home">
    <section class="home-intro">
      <div class="container home-intro-inner">
        <img class="home-shield" :src="shield" alt="" width="180" height="276">
        <div class="home-intro-text">
          <SectionTitle level="h1" title="Supernova Gaming League" :tags="['Since', '2022']" />
          <p class="home-lead">
            Counter-Strike tournaments, streamed on
            <a href="https://www.twitch.tv/EU_SGL" target="_blank" rel="noopener">twitch.tv/EU_SGL<span class="visually-hidden"> (opens in a new tab)</span></a>.
            Results, brackets, rosters and the people behind the broadcast, season by season.
          </p>
          <div class="home-socials">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>

    <div v-if="featuredMatch" class="container home-featured">
      <MatchOfTheDay :match="featuredMatch" :tournament="featuredSeason" :story="featuredSeason.featured.story" />
    </div>

    <section class="home-seasons" aria-labelledby="seasons-title">
      <div class="container">
        <h2 id="seasons-title" class="label">Seasons</h2>

        <ul class="season-list">
          <li v-for="tournament in tournaments" :key="tournament.id" class="season-card">
            <div class="season-card-top">
              <span class="tag">{{ tournament.status }}</span>
              <span class="season-dates">
                {{ formatDate(tournament.startDate) }} – {{ formatDate(tournament.endDate) }}
              </span>
            </div>

            <h3 class="season-name">
              <RouterLink :to="'/tournament/' + tournament.id" class="season-link">
                {{ tournament.name }}
                <i class="season-arrow fa-solid fa-arrow-right" aria-hidden="true"></i>
              </RouterLink>
            </h3>

            <p v-if="getChampion(tournament.id)" class="season-winner">
              <span class="season-winner-label">Champion</span>
              <img :src="getChampion(tournament.id).logo" alt="" width="28" height="28">
              {{ getChampion(tournament.id).name }}
            </p>

            <ul class="season-logos" aria-label="Teams">
              <li v-for="team in getSeasonTeams(tournament)" :key="team.id">
                <img :src="team.logo" :alt="team.name" width="48" height="48" loading="lazy">
              </li>
            </ul>

            <p class="season-plate">
              <span>{{ getSeasonTeams(tournament).length }} teams</span>
              <span class="season-plate-mid">Prize pool</span>
              <span>{{ formatEuro(tournament.prizePool) }}</span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style>
.home-intro {
  padding: 48px 0 72px;
}

.home-intro-inner {
  display: flex;
  align-items: center;
  gap: 48px;
}

.home-shield {
  display: none;
  flex-shrink: 0;
  width: 220px;
}

@media (min-width: 900px) {
  .home-shield {
    display: block;
  }
}

.home-featured {
  margin-bottom: 72px;
}

.home-socials {
  margin-top: 28px;
}

.home-lead {
  max-width: 620px;
  margin-top: 24px;
  font-size: 20px;
  color: rgb(var(--white) / 0.8);
}

.label {
  margin-bottom: 16px;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgb(var(--white) / 0.7);
}

.tag {
  display: inline-block;
  padding: 4px 10px;
  background-color: rgb(var(--slate));
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.season-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 520px), 1fr));
  gap: 24px;
}

.season-card {
  position: relative;
  border: 3px solid rgb(var(--purple));
  background-color: rgb(var(--panel) / 0.9);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.season-card-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 20px 20px 0;
}

.season-dates {
  font-size: 15px;
  font-weight: 600;
  color: rgb(var(--white) / 0.75);
}

.season-name {
  padding: 16px 20px 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(26px, 4vw, 36px);
  line-height: 1.05;
  text-transform: uppercase;
}

.season-link {
  color: rgb(var(--white));
  text-decoration: none;
}

.season-link::after {
  content: "";
  position: absolute;
  inset: 0;
}

.season-card:hover,
.season-card:has(.season-link:focus-visible) {
  border-color: rgb(var(--purple-light));
  background-color: rgb(var(--purple-deep) / 0.35);
  box-shadow: 10px 10px 0 rgb(var(--purple));
  transform: translate(-5px, -5px);
}

.season-arrow {
  margin-left: 8px;
  font-size: 0.7em;
  vertical-align: middle;
  color: rgb(var(--purple-text));
  transition: transform 0.2s ease;
}

.season-card:hover .season-arrow,
.season-card:has(.season-link:focus-visible) .season-arrow {
  transform: translateX(8px);
}

.season-logos img {
  transition: transform 0.2s ease;
}

.season-card:hover .season-logos img {
  transform: scale(1.12);
}

.season-card:has(.season-link:focus-visible) {
  outline: 2px solid rgb(var(--purple-text));
  outline-offset: 3px;
}

.season-link:focus-visible {
  outline: none;
}

.season-winner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px 0;
  font-family: var(--font-display);
  font-size: 18px;
  text-transform: uppercase;
}

.season-winner img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.season-winner-label {
  padding: 3px 8px;
  background-color: rgb(var(--purple));
  font-size: 12px;
  letter-spacing: 0.06em;
}

.season-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 24px 20px;
}

.season-logos img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.season-plate {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  font-family: var(--font-display);
  font-size: 13px;
  text-transform: uppercase;
  text-align: center;
}

.season-plate span {
  padding: 8px 12px;
  background-color: rgb(var(--plate));
  color: rgb(var(--black));
}

.season-plate .season-plate-mid {
  background-color: rgb(var(--purple));
  color: rgb(var(--white));
}
</style>