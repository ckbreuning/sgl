export const tournaments = [
    {
        id: "season-4-starfire",
        name: "SGL Season 4: Starfire",
        shortName: "Starfire",
        edition: "Season 4",
        ticker: "SGL SEASON 4: STARFIRE",
        startDate: "2025-04-17",
        endDate: "2025-05-16",
        timezone: "CEST",
        status: "finished",

        prizePool: 1550,
        prizes: [
            { place: "1st", amount: 800 },
            { place: "2nd", amount: 400 },
            { place: "3rd–4th", amount: 175 },
        ],

        format: [
            "Two GSL groups (double elimination) with 4 teams each",
            "Opening matches are Bo1, winners and elimination matches are Bo3",
            "Group winners go to the semifinals, 2nd and 3rd place go to the quarterfinals",
            "Single-elimination playoffs, Bo3, with a Bo5 grand final",
        ],

        groupResults: ["Semifinals", "Quarterfinals", "Quarterfinals", "Eliminated"],

        groups: [
            {
                id: "A",
                name: "Group A",
                teams: ["cph-wolves-academy", "cyber-empire", "divergent", "nordix-esport"],
            },
            {
                id: "B",
                name: "Group B",
                teams: ["hyperspirit", "havens", "ctrl-esports", "infurity-gaming"],
            },
        ],

        production: [
            { role: "Caster", name: "RickyDC", realName: "Rick Popken", country: "Netherlands" },
            { role: "Caster", name: "M1nusf", realName: "Tijn Krook", country: "Netherlands" },
            { role: "Caster", name: "Rufox", realName: "Paulo Pereira", country: "Portugal" },
            { role: "Producer", name: "arno3k", realName: "Arnaud François", country: "France" },
            { role: "Observer", name: "arno3k", realName: "Arnaud François", country: "France" },
        ],

        stream: "https://www.twitch.tv/EU_SGL",
        liquipedia: "https://liquipedia.net/counterstrike/SGL/Season_4/Starfire",

        featured: {
            match: "s4-final",
            story:
                "HyperSpirit lost their opening match to HAVENs and never lost again. Four series later they lifted the trophy, beating Divergent 3–⁠1 in the grand final.",
        },
    },
];