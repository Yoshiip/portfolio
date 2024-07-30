<script lang="ts">
    import { currentUser, pb } from "$lib/pocketbase";
    import { Shapes, Cog, Images } from "lucide-svelte";
    import { onMount } from "svelte";

    let projectsCount = 0;
    let imagesCount = 0;
    let skillsCount = 0;

    onMount(async () => {
        projectsCount = (await pb.collection("projects").getFullList()).length;
        imagesCount = (await pb.collection("images").getFullList()).length;
        skillsCount = (await pb.collection("skills").getFullList()).length;
    });

    function disconnect() {
        pb.authStore.clear();
        window.location.href = "/login";
    }
</script>

<h1 class="text-4xl font-bold mt-8 mb-6">
    Bonjour {$currentUser?.username}!
</h1>

<h2 class="text-2xl font-bold mt-6 mb-4">Statistiques</h2>
<div class="stats shadow">
    <div class="stat">
        <div class="stat-figure text-secondary">
            <Cog />
        </div>
        <div class="stat-title">Projets</div>
        <div class="stat-value">{projectsCount}</div>
    </div>

    <div class="stat">
        <div class="stat-figure text-secondary">
            <Images />
        </div>
        <div class="stat-title">Images</div>
        <div class="stat-value">{imagesCount}</div>
    </div>

    <div class="stat">
        <div class="stat-figure text-secondary">
            <Shapes />
        </div>
        <div class="stat-title">Compétences</div>
        <div class="stat-value">{skillsCount}</div>
    </div>
</div>
<h2 class="text-2xl font-bold mt-6 mb-4">Mon compte</h2>
<button on:click={disconnect} class="btn">Déconnexion</button>
