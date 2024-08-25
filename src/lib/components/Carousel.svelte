<script lang="ts">
    import ImageFullscreenModal from "./ImageFullscreenModal.svelte";
    import { onMount } from "svelte";
    import { ArrowLeft, ArrowRight } from "lucide-svelte";
    import type { ImagesResponse } from "../../types/pocketbase-types";
    import { pb } from "$lib/pocketbase";

    let currentIndex = 0;
    let hovered = false;
    export let images: ImagesResponse[] = [];

    let timer: NodeJS.Timeout;

    $: images, (currentIndex = 0);

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

    function imageClicked() {
        showImageFullsceenModal(images[currentIndex].id);
    }
    let showImageFullsceenModal: (imageId: string) => void;
</script>

<div class="w-full m-auto">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        on:mouseenter={() => (hovered = true)}
        on:mouseleave={() => (hovered = false)}
        class="carousel relative w-full min-h-64"
    >
        <img
            class="w-full h-full pointer-events-none"
            src="images/macbook-air.svg"
            alt="Frame"
        />
        <div
            class="rounded absolute left-[11.5%] top-[4.5%] right-[11.5%] bottom-[17.5%]"
        >
            {#each images as image, index}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <img
                    src={pb.files.getUrl(image, image.image)}
                    alt="Slide"
                    class="absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-150 cursor-zoom-in"
                    class:opacity-0={currentIndex !== index}
                    on:click={imageClicked}
                />
            {/each}
        </div>
        {#if images.length > 1}
            <div
                class="absolute pointer-events-none inset-0 flex justify-between items-center"
            >
                <button
                    class="btn btn-circle pointer-events-auto"
                    on:click={prev}
                >
                    <ArrowLeft />
                </button>
                <button
                    class="btn btn-circle pointer-events-auto"
                    on:click={next}
                >
                    <ArrowRight />
                </button>
            </div>
        {/if}
    </div>
</div>

<ImageFullscreenModal bind:showModal={showImageFullsceenModal} />

<style>
    .carousel {
        position: relative;
    }
    .carousel img {
        transition: opacity 1s ease-in-out;
    }
</style>
