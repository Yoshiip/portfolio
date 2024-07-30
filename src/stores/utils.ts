import { Gamepad, Calendar, Globe, Pen, Shapes } from "lucide-svelte";

export let projectsTypeIcons: { [key: string]: any } = {
    website: Globe,
    game: Gamepad,
    jam: Calendar,
    other: Shapes,
};

export function camelToTitleCase(str: string): string {
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}


export let projectsTypeName: { [key: string]: string } = {
    website: "Site web",
    game: "Jeu",
    jam: "Game Jam",
    other: "Autre",
};


export let skillsTypeName = {
    language: "Langage",
    software: "Logiciel",
    tool: "Outil",
    gameEngine: "Moteur de jeu",
    api: "API",
    framework: "Framework",
    os: "Système d'exploitation",
    database: "Base de données",
    other: "Autre",
};