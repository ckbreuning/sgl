# SGL — Supernova Gaming League

A results site for Supernova Gaming League, the Counter-Strike tournament organiser I co-founded in 2022. It shows SGL Season 4: Starfire with real data, in SGL's own brand.

**Live:** https://sgl.ckbreuning.com

Built by Christian Klitgaard Breuning as case 03 in my portfolio (Multimedia Design, UCN, 2026).

## What it does

- Season page with tabs: matches, groups, playoffs, teams and production
- Group standings, the playoff bracket and the champion are calculated from the match results
- Team pop-ups with roster, flags and the team's results
- Search across teams, players and coaches
- Champions page and a featured Match of the Day
- Keyboard-friendly tabs, focus moved to the main content on page change, reduced motion respected

## Built with

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/) (hash history, so it runs on one.com without server setup)
- [Font Awesome 7](https://fontawesome.com/) and Google Fonts (Russo One, Anton, Barlow)
- Flags from [flagcdn.com](https://flagcdn.com/)

## Data

The season is stored in plain JavaScript files in `src/data/`:

- `tournaments.js` — seasons, groups, prize pool, production crew
- `teams.js` — teams, rosters and logos
- `matches.js` — every match, linked to teams and season by id
- `helpers.js` — functions that work out winners, standings, placements and the champion

Source for results and rosters: [Liquipedia](https://liquipedia.net/counterstrike/SGL/Season_4/Starfire).

## Run it locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Upload the contents of `dist/` to the web server. `public/.htaccess` sets cache rules for the built files.

## Credits

Team logos and the SGL brand belong to their owners and are used for this archive of SGL's own tournament.
