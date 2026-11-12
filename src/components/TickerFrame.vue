<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "SGL",
  },
});

const edges = ["top", "right", "bottom", "left"];

const repeats = computed(() => Math.ceil(240 / (props.text.length + 1)));
</script>

<template>
  <div class="ticker-frame" aria-hidden="true">
    <div v-for="edge in edges" :key="edge" class="ticker" :class="'ticker-' + edge">
      <span v-for="n in repeats" :key="n" class="ticker-text">{{ text }}</span>
    </div>

    <span class="corner corner-tl"></span>
    <span class="corner corner-tr"></span>
    <span class="corner corner-bl"></span>
    <span class="corner corner-br"></span>
  </div>
</template>

<style>
.ticker-frame {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
}

.ticker {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.7em;
  overflow: hidden;
  white-space: nowrap;
  background-color: rgb(var(--black));
  color: rgb(var(--white) / 0.75);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 0.08em;
  line-height: 1;
}

@media (min-width: 900px) {
  .ticker {
    font-size: 11px;
  }
}

.ticker-top,
.ticker-bottom {
  left: 0;
  right: 0;
  height: var(--frame);
  padding: 0 6px;
}

.ticker-top {
  top: 0;
}

.ticker-bottom {
  bottom: 0;
}

.ticker-left,
.ticker-right {
  top: var(--frame);
  bottom: var(--frame);
  width: var(--frame);
  padding: 6px 0;
  writing-mode: vertical-rl;
}

.ticker-right {
  right: 0;
}

.ticker-left {
  left: 0;
  transform: rotate(180deg);
}

.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: rgb(var(--purple-light));
  border-style: solid;
  border-width: 0;
}

.corner-tl {
  top: var(--frame);
  left: var(--frame);
  border-top-width: 2px;
  border-left-width: 2px;
}

.corner-tr {
  top: var(--frame);
  right: var(--frame);
  border-top-width: 2px;
  border-right-width: 2px;
}

.corner-bl {
  bottom: var(--frame);
  left: var(--frame);
  border-bottom-width: 2px;
  border-left-width: 2px;
}

.corner-br {
  bottom: var(--frame);
  right: var(--frame);
  border-bottom-width: 2px;
  border-right-width: 2px;
}

@media (max-width: 767px) {
  .ticker-frame {
    position: absolute;
  }

  .ticker-left,
  .ticker-right,
  .corner {
    display: none;
  }
}
</style>