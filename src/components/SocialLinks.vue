<script setup>
import { socials } from "@/data/socials.js";
</script>

<template>
  <ul class="socials">
    <li v-for="social in socials" :key="social.name">
      <a class="social-link" :href="social.url" target="_blank" rel="noopener">
        <i class="fa-brands" :class="social.icon" aria-hidden="true"></i>
        <span class="visually-hidden">SGL on {{ social.name }} (opens in a new tab)</span>
      </a>
    </li>
  </ul>
</template>

<style>
.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 2px solid rgb(var(--purple));
  color: rgb(var(--white));
  font-size: 18px;
  text-decoration: none;
}

.social-link:hover {
  background-color: rgb(var(--purple));
}
</style>