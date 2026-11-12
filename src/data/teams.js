import cphWolvesAcademyLogo from "@/assets/logos/cph-wolves-academy.webp";
import ctrlEsportsLogo from "@/assets/logos/ctrl-esports.webp";
import cyberEmpireLogo from "@/assets/logos/cyber-empire.webp";
import divergentLogo from "@/assets/logos/divergent.webp";
import havensLogo from "@/assets/logos/havens.webp";
import hyperspiritLogo from "@/assets/logos/hyperspirit.webp";
import infurityGamingLogo from "@/assets/logos/infurity-gaming.webp";
import nordixEsportLogo from "@/assets/logos/nordix-esport.webp";
import nexusGamingLogo from "@/assets/logos/nexus-gaming.webp";

export const teams = [
    {
        id: "cph-wolves-academy",
        name: "CPH Wolves Academy",
        logo: cphWolvesAcademyLogo,
        coach: null,
        players: [
            { name: "tr1lle", country: "Denmark" },
            { name: "HalF", country: "Denmark" },
            { name: "BqreBedre", country: "Denmark" },
            { name: "myzunic", country: "France" },
            { name: "Freesies", country: "Estonia" },
        ],
    },
    {
        id: "ctrl-esports",
        name: "CTRL Esports",
        logo: ctrlEsportsLogo,
        coach: { name: "Django", country: "Denmark" },
        players: [
            { name: "GOYO007", country: "Spain" },
            { name: "Byfield", country: "United Kingdom" },
            { name: "rim3", country: "Turkey" },
            { name: "REL", country: "Lithuania" },
            { name: "FamouZ", country: "Portugal" },
        ],
    },
    {
        id: "cyber-empire",
        name: "Cyber Empire",
        logo: cyberEmpireLogo,
        coach: { name: "tiistorm", country: "Latvia" },
        players: [
            { name: "HexoQ", country: "Latvia" },
            { name: "ASTR", country: "Latvia" },
            { name: "Whiskas", country: "Latvia" },
            { name: "makaroff", country: "Latvia" },
            { name: "meowpop", country: "Latvia" },
        ],
    },
    {
        id: "divergent",
        name: "Divergent",
        logo: divergentLogo,
        coach: { name: "Fisker", country: "Algeria" },
        players: [
            { name: "VENO", country: "Serbia" },
            { name: "miwo", country: "Montenegro" },
            { name: "ScorpiioooN", country: "Montenegro" },
            { name: "zakarinh0", country: "Algeria" },
            { name: "Floca", country: "France" },
        ],
    },
    {
        id: "havens",
        name: "HAVENs",
        logo: havensLogo,
        coach: { name: "WIPSKY", country: "Latvia" },
        players: [
            { name: "v1trage", country: "Latvia" },
            { name: "yaankz", country: "Latvia" },
            { name: "mairel", country: "Latvia" },
            { name: "rabbit", country: "Latvia" },
            { name: "keni", country: "Latvia" },
        ],
    },
    {
        id: "hyperspirit",
        name: "HyperSpirit",
        logo: hyperspiritLogo,
        coach: { name: "starkiller", country: "Romania" },
        players: [
            { name: "swiiffter", country: "Romania" },
            { name: "Ciocardau", country: "Romania" },
            { name: "ra1n", country: "Romania" },
            { name: "d1maje", country: "Romania" },
            {
                name: "ADRON",
                country: "Romania",
                org: { name: "Nexus Gaming", logo: nexusGamingLogo },
            },
        ],
    },
    {
        id: "infurity-gaming",
        name: "INFURITY Gaming",
        logo: infurityGamingLogo,
        coach: { name: "sapienza", country: "Norway" },
        players: [
            { name: "artstyle", country: "Norway" },
            { name: "zykes", country: "Norway" },
            { name: "aRTYSAN", country: "Norway" },
            { name: "blaziiN", country: "Sweden" },
            { name: "Spredd", country: "Norway" },
        ],
    },
    {
        id: "nordix-esport",
        name: "Nordix Esport",
        logo: nordixEsportLogo,
        coach: null,
        players: [
            { name: "berzerk", country: "Norway" },
            { name: "realyummy", country: "Sweden" },
            { name: "Brave", country: "Norway" },
            { name: "samee", country: "Sweden" },
            { name: "sense", country: "Norway" },
        ],
    },
];