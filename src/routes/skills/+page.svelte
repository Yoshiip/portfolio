<script lang="ts">
  import SkillCard from "$lib/components/SkillCard.svelte";

  import {
    Brain,
    Database,
    Gamepad,
    Globe,
    Monitor,
    Phone,
    Shapes,
  } from "lucide-svelte";
  import { type PageData } from "./$types";
  type SkillDomain = {
    name: string;
    icon: any;
    gradient: string;
  };

  const SKILLS_DOMAINS: SkillDomain[] = [
    {
      name: "Web Development",
      icon: Globe,
      gradient: "from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-700",
    },
    {
      name: "Video Game Development",
      icon: Gamepad,
      gradient: "from-red-200 to-red-100",
    },
    {
      name: "Software Development",
      icon: Monitor,
      gradient: "from-purple-200 to-purple-100",
    },
    {
      name: "Mobile Development",
      icon: Phone,
      gradient: "from-green-200 to-green-100",
    },
    {
      name: "Artificial Intelligence",
      icon: Brain,
      gradient: "from-purple-200 to-purple-100",
    },
    {
      name: "Database",
      icon: Database,
      gradient: "from-yellow-200 to-yellow-100",
    },
    {
      name: "UI/UX Design",
      icon: Shapes,
      gradient: "from-pink-200 to-pink-100",
    },
  ];

  let {
    data,
  }: {
    data: PageData;
  } = $props();
</script>

<svelte:head>
  <title>Skills • Tourneur Aymeri</title>
  <meta name="description" content="Portfolio de Tourneur Aymeri" />
</svelte:head>

<main class="max-w-6xl m-auto">
  <h1 class="text-6xl font-black text-center mt-32 mb-24">Skills</h1>
  <div class="p-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
    {#each SKILLS_DOMAINS as domain}
      {@const SvelteComponent = domain.icon}
      <div class="card bg-linear-to-t {domain.gradient}">
        <div class="card-body">
          <div class="flex justify-between px-4 gap-4">
            <span class="text-gray-700 font-bold">{domain.name}</span>

            <SvelteComponent />
          </div>
        </div>
      </div>
    {/each}
  </div>

  <h2 class="text-2xl font-bold mt-6 mb-4">All my skills</h2>
  <div class="grid gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 pb-16">
    {#each data.skills as skill}
      {#if !skill.hidden}
        <SkillCard {skill} />
      {/if}
    {/each}
  </div>
</main>
