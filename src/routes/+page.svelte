<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import StylizedButton from "$lib/components/StylizedButton.svelte";
    import { Shapes, Star } from "lucide-svelte";
</script>

<svelte:head>
    <title>Portfolio • Tourneur Aymeri</title>
    <meta name="description" content="Portfolio de Tourneur Aymeri" />
</svelte:head>

<Navbar />

<main class="mt-64 flex items-center justify-center dark:text-gray-50">
    <div class="flex flex-col gap-8">
        <h1 class="text-6xl font-bold">TOURNEUR AYMERI</h1>
        <p>
            Je suis un étudiant en 3ème année de <strong
                >BUT Informatique</strong
            >, à l'Université de Lille.<br />
            Sur ce site, vous retrouverez les <strong>projets</strong> que j'ai
            pu réaliser, ainsi que mes <strong>compétences</strong>.
        </p>
        <div class="flex gap-4">
            <StylizedButton
                href="/projects/"
                background="/images/projects_button_background.jpg"
            >
                <Star fill="true" />
                Projets
            </StylizedButton>
            <StylizedButton
                href="/skills/"
                background="/images/skills_button_background.jpg"
            >
                <Shapes fill="true" />
                Compétences
            </StylizedButton>
        </div>
    </div>
</main>
