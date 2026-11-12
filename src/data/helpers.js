import { teams } from "./teams.js";
import { tournaments } from "./tournaments.js";
import { matches } from "./matches.js";

export function getTeam(id) {
    return teams.find((team) => team.id === id);
}

export function getPlayerCountry(teamId, playerName) {
    const team = getTeam(teamId);
    const player = team.players.find((item) => item.name === playerName);
    return player ? player.country : null;
}

export function getTournament(id) {
    return tournaments.find((tournament) => tournament.id === id);
}

export function getSeasonTeams(tournament) {
    const list = [];
    for (const group of tournament.groups) {
        for (const id of group.teams) {
            list.push(getTeam(id));
        }
    }
    return list;
}

export function getMatches(tournamentId) {
    const list = matches.filter((match) => match.tournament === tournamentId);
    return list.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

export function getTeamMatches(tournamentId, teamId) {
    return getMatches(tournamentId).filter((match) => match.teamA === teamId || match.teamB === teamId);
}

export function getWinner(match) {
    if (match.forfeit) {
        return match.forfeit === match.teamA ? match.teamB : match.teamA;
    }
    if (match.scoreA === null || match.scoreB === null) {
        return null;
    }
    return match.scoreA > match.scoreB ? match.teamA : match.teamB;
}

export function getLoser(match) {
    const winner = getWinner(match);
    if (!winner) {
        return null;
    }
    return winner === match.teamA ? match.teamB : match.teamA;
}

export function getChampion(tournamentId) {
    const final = matches.find((match) => match.tournament === tournamentId && match.stage === "final");
    if (!final) {
        return null;
    }
    return getTeam(getWinner(final));
}

export function getMatch(id) {
    return matches.find((match) => match.id === id);
}

export function getFinal(tournamentId) {
    return matches.find((match) => match.tournament === tournamentId && match.stage === "final");
}

export function getPlacements(tournament) {
    const final = getFinal(tournament.id);
    if (!final || !getWinner(final)) {
        return [];
    }

    const semifinals = getMatches(tournament.id).filter((match) => match.stage === "semifinal");
    const places = [
        { place: "1st", teams: [getWinner(final)] },
        { place: "2nd", teams: [getLoser(final)] },
        { place: "3rd–4th", teams: semifinals.map(getLoser) },
    ];

    return places.map((item) => {
        const prize = tournament.prizes.find((entry) => entry.place === item.place);
        return {
            place: item.place,
            teams: item.teams.map(getTeam),
            amount: prize ? prize.amount : null,
        };
    });
}

export function getGroupStandings(tournament, groupId) {
    const group = tournament.groups.find((item) => item.id === groupId);
    const groupMatches = getMatches(tournament.id).filter(
        (match) => match.stage === "group" && match.group === groupId,
    );
    const winnersMatch = groupMatches.find((match) => match.round === "winners");
    const eliminationMatch = groupMatches.find((match) => match.round === "elimination");

    let order = group.teams;
    if (winnersMatch && eliminationMatch && getWinner(winnersMatch) && getWinner(eliminationMatch)) {
        order = [
            getWinner(winnersMatch),
            getLoser(winnersMatch),
            getWinner(eliminationMatch),
            getLoser(eliminationMatch),
        ];
    }

    return order.map((teamId, index) => {
        let wins = 0;
        let losses = 0;
        let mapsWon = 0;
        let mapsLost = 0;

        for (const match of groupMatches) {
            const played = match.teamA === teamId || match.teamB === teamId;
            const winner = getWinner(match);

            if (played && winner) {
                if (winner === teamId) {
                    wins = wins + 1;
                } else {
                    losses = losses + 1;
                }

                if (!match.forfeit) {
                    if (match.teamA === teamId) {
                        mapsWon = mapsWon + match.scoreA;
                        mapsLost = mapsLost + match.scoreB;
                    } else {
                        mapsWon = mapsWon + match.scoreB;
                        mapsLost = mapsLost + match.scoreA;
                    }
                }
            }
        }

        return {
            team: getTeam(teamId),
            place: index + 1,
            wins: wins,
            losses: losses,
            mapsWon: mapsWon,
            mapsLost: mapsLost,
            result: tournament.groupResults[index],
        };
    });
}

export function getSearchIndex() {
    const items = [];

    for (const tournament of tournaments) {
        for (const team of getSeasonTeams(tournament)) {
            const link = "/tournament/" + tournament.id + "?tab=teams&team=" + team.id;

            items.push({
                id: tournament.id + "-" + team.id,
                type: "Team",
                name: team.name,
                detail: tournament.name,
                logo: team.logo,
                to: link,
            });

            const people = team.players.map((player) => ({ ...player, role: "Player" }));
            if (team.coach) {
                people.push({ ...team.coach, role: "Coach" });
            }

            for (const person of people) {
                items.push({
                    id: tournament.id + "-" + team.id + "-" + person.name,
                    type: person.role,
                    name: person.name,
                    detail: team.name,
                    country: person.country,
                    to: link,
                });
            }
        }
    }

    return items;
}

export function getStageName(match) {
    const rounds = {
        opening: "Opening match",
        winners: "Winners match",
        elimination: "Elimination match",
    };
    const stages = {
        quarterfinal: "Quarterfinal",
        semifinal: "Semifinal",
        final: "Grand final",
    };
    if (match.stage === "group") {
        return rounds[match.round];
    }
    return stages[match.stage];
}

export function getScore(match, teamId) {
    if (match.forfeit) {
        return match.forfeit === teamId ? "FF" : "W";
    }
    if (match.format === "BO1" && match.maps.length === 1) {
        return teamId === match.teamA ? match.maps[0].scoreA : match.maps[0].scoreB;
    }
    return teamId === match.teamA ? match.scoreA : match.scoreB;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function formatEuro(amount) {
    return "€" + amount.toLocaleString("en-GB");
}