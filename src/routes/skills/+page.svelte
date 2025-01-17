<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import ProjectModal from "$lib/components/ProjectModal.svelte";
  import SkillCard from "$lib/components/SkillCard.svelte";
  import SkillDetailModal from "$lib/components/SkillModal.svelte";
  import type { SkillsResponse } from "$db/pocketbase-types";

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
  import { openModal } from "$lib/modals.svelte";

  const SKILLS_DOMAINS: Record<string, any> = {
    "Développement Web": Globe,
    "Développement de jeux vidéo": Gamepad,
    "Développement logiciel": Monitor,
    "Développement mobile": Phone,
    "Intelligence artificielle": Brain,
    "Base de données": Database,
    "UI/UX Design": Shapes,
  };

  const GRADIENTS = [
    "from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-700",
    "from-red-200 to-red-100",
    "from-purple-200 to-purple-100",
    "from-green-200 to-green-100",
    "from-purple-200 to-purple-100",
    "from-yellow-200 to-yellow-100",
    "from-pink-200 to-pink-100",
  ];

  let {
    data,
  }: {
    data: PageData;
  } = $props();
</script>

<svelte:head>
  <title>Compétences • Tourneur Aymeri</title>
  <meta name="description" content="Portfolio de Tourneur Aymeri" />
</svelte:head>

<Navbar />

<main class="max-w-6xl m-auto">
  <h1 class="text-6xl font-black text-center mt-32 mb-24">Compétences</h1>
  <div class="p-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
    {#each Object.keys(SKILLS_DOMAINS) as domain}
      {@const SvelteComponent = SKILLS_DOMAINS[domain]}
      <div
        class="card card-compact bg-gradient-to-t {GRADIENTS[
          Object.keys(SKILLS_DOMAINS).indexOf(domain) % GRADIENTS.length
        ]}"
      >
        <div class="card-body">
          <div class="flex justify-between px-4 gap-4">
            <span class="text-gray-700 font-bold">{domain}</span>

            <SvelteComponent />
          </div>
        </div>
      </div>
    {/each}
  </div>

  <h2 class="text-2xl font-bold mt-6 mb-4">Toutes mes compétences</h2>
  <div class="grid gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 pb-16">
    {#each data.skills as skill}
      {#if !skill.hidden}
        <SkillCard {skill} />
      {/if}
    {/each}
  </div>
</main>
