<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { modals } from "$lib/modals.svelte";
  import ImageFullscreenModal from "$lib/components/ImageFullscreenModal.svelte";
  import ProjectModal from "$lib/components/ProjectModal.svelte";
  import SkillModal from "$lib/components/SkillModal.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import "../app.css";
  import type { Snippet } from "svelte";
  import Background from "$lib/components/Background.svelte";

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<Background />

<svelte:head>
  <script
    defer
    data-domain="aymeri.dev"
    src="https://plausible.aymeri.dev/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
  ></script>
  <script>
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
  </script>
</svelte:head>

<Navbar />

{@render children?.()}

{#each modals.modals as { id, type, data }}
  {#if type === "ProjectModal"}
    <ProjectModal {id} {data} />
  {:else if type === "ImageFullscreenModal"}
    <ImageFullscreenModal {id} {data} />
  {:else if type === "SkillModal"}
    <SkillModal {id} {data} />
  {/if}
{/each}
