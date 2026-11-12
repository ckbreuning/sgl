<script setup>
import { computed } from "vue";
import CountryFlag from "@/components/CountryFlag.vue";

const props = defineProps({
  tournament: {
    type: Object,
    required: true,
  },
});

const crew = computed(() => {
  const people = [];
  for (const person of props.tournament.production) {
    const existing = people.find((item) => item.name === person.name);
    if (existing) {
      existing.roles.push(person.role);
    } else {
      people.push({
        name: person.name,
        realName: person.realName,
        country: person.country,
        roles: [person.role],
      });
    }
  }
  return people;
});
</script>

<template>
  <ul class="crew">
    <li v-for="person in crew" :key="person.name" class="crew-card">
      <p class="crew-roles">
        <span
          v-for="role in person.roles"
          :key="role"
          class="crew-role"
          :class="role === 'Caster' ? 'is-caster' : 'is-staff'"
        >
          {{ role }}
        </span>
      </p>
      <p class="crew-name"><CountryFlag :country="person.country" />{{ person.name }}</p>
      <p class="crew-real">{{ person.realName }}</p>
    </li>
  </ul>
</template>

<style>
.crew {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: 24px;
}

.crew-card {
  padding: 20px;
  border: 3px solid rgb(var(--purple));
  background-color: rgb(var(--panel) / 0.9);
}

.crew-roles {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.crew-role {
  padding: 3px 10px;
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.crew-role.is-caster {
  background-color: rgb(var(--caster));
}

.crew-role.is-staff {
  background-color: rgb(var(--coral));
  color: rgb(var(--black));
}

.crew-name {
  margin-top: 16px;
  font-family: var(--font-display);
  font-size: 30px;
  line-height: 1.05;
  text-transform: uppercase;
}

.crew-name .flag {
  width: 1.2em;
  height: 0.9em;
  margin-right: 0.25em;
  vertical-align: -0.12em;
}

.crew-real {
  margin-top: 6px;
  font-size: 16px;
  color: rgb(var(--white) / 0.7);
}
</style>