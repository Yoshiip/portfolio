<script lang="ts">
  import StylizedButton from "$lib/components/StylizedButton.svelte";
  import { Gamepad, Shapes, Star } from "lucide-svelte";
  import BigName from "./BigName.svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";

  onMount(() => {
    gsap.from("#mainParagraph", {
      autoAlpha: 0,
      delay: 1.5,
      y: 20,
    });
    gsap.from(document.querySelectorAll("#actions"), {
      y: 10,
      autoAlpha: 0.0,
      stagger: 0.1,
      delay: 2.5,
    });
  });
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
    <p class="font-serif text-lg" id="mainParagraph">
      I am a third-year student in <strong>BUT Computer Science</strong> at the
      University of Lille.<br />
      On this site, you will find the <strong>projects</strong> I have worked
      on, as well as my <strong>skills</strong>.
    </p>

    <div class="flex gap-4" id="actions">
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
        Projects
      </StylizedButton>
      <StylizedButton
        href="/skills/"
        background="/images/skills_button_background.jpg"
      >
        <Shapes fill="true" />
        Skills
      </StylizedButton>
    </div>
  </div>
</main>
