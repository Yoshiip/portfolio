import { Gamepad, Calendar, Globe, Pen, Shapes } from "lucide-svelte";

export let projectsTypeIcons: { [key: string]: any } = {
  website: Globe,
  game: Gamepad,
  jam: Calendar,
  other: Shapes,
};

export function camelToTitleCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export let projectsTypeName: { [key: string]: string } = {
  website: "Website",
  game: "Game",
  jam: "Game Jam",
  //   app: "Application",
  other: "Other",
};

export let skillsTypeName = {
  language: "Language",
  software: "Software",
  tool: "Tool",
  gameEngine: "Game Engine",
  api: "API",
  framework: "Framework",
  os: "Operating System",
  database: "Database",
  other: "Other",
};
