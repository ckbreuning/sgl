<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  level: {
    type: String,
    default: "h2",
  },
});
</script>

<template>
  <div class="section-title">
    <component :is="level" class="section-title-text">{{ title }}</component>
    <span v-if="tags.length" class="section-title-tags">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </span>
  </div>
</template>

<style>
.section-title {
  font-family: var(--font-display);
  font-size: clamp(40px, 8vw, 88px);
  line-height: 0.95;
}

.section-title-text {
  display: inline;
  font-weight: 400;
  font-size: 1em;
  text-transform: uppercase;
  color: rgb(var(--white));
}

.section-title-tags {
  display: inline-flex;
  flex-direction: column;
  margin-left: 16px;
  padding: 6px 10px;
  vertical-align: middle;
  background-color: rgb(var(--purple));
  font-size: clamp(13px, 1.6vw, 18px);
  line-height: 1.05;
  text-transform: uppercase;
  white-space: nowrap;
}
</style>