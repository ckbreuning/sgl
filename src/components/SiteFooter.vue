<script setup>
import SocialLinks from "@/components/SocialLinks.vue";
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer-inner">
      <div class="footer-follow">
        <p class="footer-brand">SGL · Since 2022</p>
        <SocialLinks />
      </div>
      <p class="footer-credit">
        An archive of Supernova Gaming League. Designed and built by
        <a href="https://ckbreuning.com">Christian Klitgaard Breuning</a>.
      </p>
    </div>
  </footer>
</template>

<style>
.site-footer {
  margin-top: 96px;
  border-top: 1px solid rgb(var(--line) / 0.12);
}

.site-footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-top: 32px;
  padding-bottom: 32px;
  font-size: 15px;
  color: rgb(var(--white) / 0.7);
}

.footer-follow {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-brand {
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  color: rgb(var(--white));
}
</style>