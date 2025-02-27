<script lang="ts">
  import StylizedButton from "$lib/components/StylizedButton.svelte";
  import { Gamepad, Shapes, Star } from "lucide-svelte";
  import BigName from "./BigName.svelte";
</script>

<svelte:head>
  <title>Portfolio • Tourneur Aymeri</title>
  <meta name="description" content="Portfolio de Tourneur Aymeri" />
</svelte:head>

<main
  class="flex items-center flex-col justify-center h-full bg-neutral text-white"
>
  <div class="w-full">
    <BigName />
  </div>
  <div class="flex flex-col gap-8">
    <p>
      Je suis un étudiant en 3ème année de <strong>BUT Informatique</strong>, à
      l'Université de Lille.<br />
      Sur ce site, vous retrouverez les <strong>projets</strong> que j'ai pu
      réaliser, ainsi que mes <strong>compétences</strong>.
    </p>
    <div class="flex gap-4">
      <StylizedButton
        href="https://aymeri100.fr"
        background="/images/projects_button_background.jpg"
      >
        <Gamepad />
        Aymeri's 100
      </StylizedButton>
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
