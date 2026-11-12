<script setup>
import { RouterLink } from "vue-router";
import SiteSearch from "@/components/SiteSearch.vue";
import shield from "@/assets/brand/sgl.webp";
</script>

<template>
  <header class="site-header">
    <div class="container site-header-inner">
      <RouterLink to="/" class="brand">
        <img class="brand-shield" :src="shield" alt="" width="40" height="61">
        <span class="brand-text">
          <span class="brand-name">SGL</span>
          <span class="brand-sub">Supernova Gaming League</span>
        </span>
      </RouterLink>

      <nav aria-label="Main">
        <ul class="nav-list">
          <li>
            <RouterLink to="/" class="nav-link">Seasons</RouterLink>
          </li>
          <li>
            <RouterLink to="/champions" class="nav-link">Champions</RouterLink>
          </li>
          <li>
            <SiteSearch />
          </li>
          <li>
            <a href="https://www.twitch.tv/EU_SGL" class="nav-link nav-twitch" target="_blank" rel="noopener">
              <i class="fa-brands fa-twitch" aria-hidden="true"></i>
              <span class="nav-text">Twitch</span><span class="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style>
.site-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgb(var(--white));
  text-decoration: none;
}

.brand-shield {
  width: 32px;
  height: auto;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 22px;
  letter-spacing: 0.08em;
}

.brand-sub {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--white) / 0.65);
}

.nav-list {
  display: flex;
  gap: 8px;
}

.nav-link {
  display: block;
  padding: 8px 12px;
  color: rgb(var(--white));
  font-family: var(--font-display);
  font-size: 14px;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  border-bottom-color: rgb(var(--purple-light));
}

.nav-link.router-link-exact-active {
  border-bottom-color: rgb(var(--purple));
}

.nav-twitch {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgb(var(--purple));
}

.nav-twitch:hover {
  background-color: rgb(var(--purple-light));
  border-bottom-color: transparent;
}

@media (max-width: 560px) {
  .site-header-inner {
    flex-wrap: wrap;
    gap: 12px;
  }

  .brand-sub {
    display: none;
  }

  .nav-list {
    flex-wrap: wrap;
    gap: 2px;
  }

  .nav-text {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .nav-link {
    padding: 8px;
    font-size: 13px;
  }

  .nav-link.nav-twitch,
  .nav-link.search-button {
    justify-content: center;
    min-width: 44px;
    min-height: 40px;
  }
}
</style>