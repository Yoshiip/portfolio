<script lang="ts">
  import ImageFullscreenModal from "./ImageFullscreenModal.svelte";
  import { onMount } from "svelte";
  import { ArrowLeft, ArrowRight } from "lucide-svelte";
  import type { ImagesResponse } from "$db/pocketbase-types";
  import { pb } from "$db/pocketbase";
  import { openModal } from "$lib/modals.svelte";

  let currentIndex = $state(0);
  let hovered = $state(false);

  let {
    images = [],
  }: {
    images: ImagesResponse[];
  } = $props();

  let timer: any;

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  onMount(() => {
    timer = setInterval(() => {
      if (!hovered) next();
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  });

  function imageClicked(image: ImagesResponse) {
    openModal("ImageFullscreenModal", {
      image,
    });
  }
</script>

<div class="w-full m-auto">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    onmouseenter={() => (hovered = true)}
    onmouseleave={() => (hovered = false)}
    class="carousel relative w-full min-h-64"
  >
    <img
      class="w-full h-full pointer-events-none"
      src="images/macbook-air.svg"
      alt="Frame"
    />
    <div
      class="rounded-sm absolute left-[11.5%] top-[4.5%] right-[11.5%] bottom-[17.5%]"
    >
      {#each images as image, index}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <img
          src={pb.files.getURL(image, image.image)}
          alt="Slide"
          class="absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-150 cursor-zoom-in"
          class:opacity-0={currentIndex !== index}
          onclick={() => {
            imageClicked(image);
          }}
        />
      {/each}
    </div>
    {#if images.length > 1}
      <div
        class="absolute pointer-events-none inset-0 flex justify-between items-center"
      >
        <button class="btn btn-circle pointer-events-auto" onclick={prev}>
          <ArrowLeft />
        </button>
        <button class="btn btn-circle pointer-events-auto" onclick={next}>
          <ArrowRight />
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .carousel {
    position: relative;
  }
  .carousel img {
    transition: opacity 1s ease-in-out;
  }
</style>
