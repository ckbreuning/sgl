<script setup>
import { computed } from "vue";
import { countryCodes } from "@/data/countries.js";

const props = defineProps({
  country: {
    type: String,
    required: true,
  },
});

const code = computed(() => countryCodes[props.country]);
</script>

<!-- Flag images from Flagpedia's flag CDN: https://flagcdn.com -->
<template>
  <img
    v-if="code"
    class="flag"
    :src="'https://flagcdn.com/' + code + '.svg'"
    :alt="country"
    :title="country"
    width="16"
    height="12"
    loading="lazy"
  >
  <span v-else class="flag-missing">{{ country }}</span>
</template>

<style>
.flag {
  display: inline-block;
  width: 1em;
  height: 0.75em;
  margin-right: 0.3em;
  object-fit: cover;
  vertical-align: -0.05em;
  box-shadow: 0 0 0 1px rgb(var(--line) / 0.15);
}

.flag-missing {
  margin-right: 8px;
  font-size: 0.8em;
  color: rgb(var(--white) / 0.7);
}
</style>