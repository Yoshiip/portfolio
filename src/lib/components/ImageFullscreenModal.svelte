<script lang="ts">
  import { pb } from "$db/pocketbase";
  import type { ImagesResponse } from "$db/pocketbase-types";
  import { closeModal } from "$lib/modals.svelte";
  import { onMount } from "svelte";

  let modal = $state<HTMLDialogElement>();

  let src = $state<string>("");
  let alt = $state<string>("");

  let {
    id,
    data,
  }: {
    id: string;
    data: {
      image: ImagesResponse;
    };
  } = $props();

  onMount(() => {
    modal?.showModal();
    const image = data.image;
    src = pb.files.getURL(image, image.image);
    alt = image.alt;
  });
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <div class="flex flex-col gap-2">
      <img {src} {alt} class="w-full rounded-xl" />
      <div class="flex items-center">
        {#if alt}
          <span class="grow">{alt}</span>
        {/if}
      </div>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={() => closeModal(id)}>close</button>
  </form>
</dialog>
