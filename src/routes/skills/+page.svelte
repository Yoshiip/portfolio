<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import ProjectModal from "$lib/components/ProjectModal.svelte";
    import SkillCard from "$lib/components/SkillCard.svelte";
    import SkillDetailModal from "$lib/components/SkillDetailModal.svelte";
    import { dark } from "../../stores/theme";
    import type {
        ProjectsResponse,
        SkillsResponse,
    } from "../../types/pocketbase-types";

    import {
        Brain,
        Database,
        Gamepad,
        Globe,
        Monitor,
        Phone,
        Shapes,
    } from "lucide-svelte";

    let skillsDomains: Record<string, any> = {
        "Développement Web": Globe,
        "Développement de jeux vidéo": Gamepad,
        "Développement logiciel": Monitor,
        "Développement mobile": Phone,
        "Intelligence artificielle": Brain,
        "Base de données": Database,
        "UI/UX Design": Shapes,
    };

    let gradients = [
        "from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-700",
        "from-red-200 to-red-100",
        "from-purple-200 to-purple-100",
        "from-green-200 to-green-100",
        "from-purple-200 to-purple-100",
        "from-yellow-200 to-yellow-100",
        "from-pink-200 to-pink-100",
    ];

    interface PageData {
        skills: SkillsResponse[];
    }
    export let data: PageData;

    let showModal: (skill: SkillsResponse) => void;
    let showProjectModal: (project: ProjectsResponse) => void;
</script>

<svelte:head>
    <title>Compétences • Tourneur Aymeri</title>
    <meta name="description" content="Portfolio de Tourneur Aymeri" />
</svelte:head>

<Navbar />

<div
    class="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
></div>

<div
    class:hidden={$dark}
    class="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"
></div>

<main class="max-w-6xl m-auto">
    <h1 class="text-6xl font-black text-center mt-32 mb-24">Compétences</h1>
    <div class="p-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {#each Object.keys(skillsDomains) as domain}
            <div
                class="card card-compact bg-gradient-to-t {gradients[
                    Object.keys(skillsDomains).indexOf(domain) %
                        gradients.length
                ]}"
            >
                <div class="card-body">
                    <div class="flex justify-between px-4 gap-4">
                        <span class="text-gray-700 font-bold">{domain}</span>

                        <svelte:component this={skillsDomains[domain]} />
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <h2 class="text-2xl font-bold mt-6 mb-4">Toutes mes compétences</h2>
    <div class="grid gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 pb-16">
        {#each data.skills as skill}
            {#if !skill.hidden}
                <SkillCard {skill} onClick={() => showModal(skill)} />
            {/if}
        {/each}
    </div>
</main>

<ProjectModal bind:showModal={showProjectModal} showNavigationArrows={false} />
<SkillDetailModal bind:showModal bind:showProjectModal />
