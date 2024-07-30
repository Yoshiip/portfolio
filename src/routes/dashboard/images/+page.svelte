<script lang="ts">
    import ImageModal from "$lib/components/dashboard/modals/ImageModal.svelte";
    import { pb } from "$lib/pocketbase";
    import { onDestroy, onMount } from "svelte";
    import { ImageUp, Pen, Trash } from "lucide-svelte";
    import type { RecordModel } from "pocketbase";
    import ImageFullscreenModal from "$lib/components/dashboard/modals/ImageFullscreenModal.svelte";
    import { addToast } from "../../../stores/toasts";
    import { ToastType } from "$lib/ToastType";

    let showImageModal: (editingId: string) => void;
    let showImageFullscreenModal: (imageId: string) => void;

    let images: RecordModel[] = [];

    onMount(async () => {
        addToast("Chargement des images", ToastType.SUCCESS);
        pb.collection("images").subscribe("*", (e) => {
            switch (e.action) {
                case "create":
                    images.push(e.record);
                    break;
                case "update":
                    const index = images.findIndex((i) => i.id === e.record.id);
                    images[index] = e.record;
                    break;
                case "delete":
                    images = images.filter((i) => i.id !== e.record.id);
                    break;
            }
        });
        images = await pb.collection("images").getFullList();
    });

    onDestroy(() => {
        pb.collection("images").unsubscribe();
    });

    function deleteImage(imageId: string) {
        pb.collection("images").delete(imageId);
    }
</script>

<svelte:head>
    <title>Images - Portfolio</title>
</svelte:head>

<div class="block">
    <h1 class="text-2xl font-bold text-slate-700 mt-4 mb-2">Images</h1>

    <button on:click={() => showImageModal("")} class="btn btn-primary">
        <ImageUp />
        Téleverser une image
    </button>
</div>

<h2 class="text-xl font-bold text-slate-600 mt-3 mb-1">Liste des images</h2>

<div class="grid grid-cols-4 gap-2">
    {#each images as image}
        <div class="tooltip" data-tip={image.alt ? image.alt : "No alt"}>
            <div
                class="card bg-base-100 w-64 aspect-video rounded-xl shadow-xl hover:brightness-110 active:scale-90 transition-transform"
            >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <img
                    src={pb.files.getUrl(image, image.image, {
                        thumb: "640x360",
                    })}
                    alt={image.alt}
                    on:click={() => showImageFullscreenModal(image.id)}
                    class="rounded-xl cursor-zoom-in"
                />
                <div class="absolute bottom-2 right-2 card-actions justify-end">
                    <div class="tooltip" data-tip="Edit">
                        <button
                            class="btn"
                            on:click={() => showImageModal(image.id)}
                            ><Pen class="size-4" /></button
                        >
                    </div>
                    <div class="tooltip" data-tip="Delete">
                        <button
                            class="btn"
                            on:click={() => deleteImage(image.id)}
                            ><Trash class="size-4" /></button
                        >
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>

<ImageModal bind:showModal={showImageModal} />
<ImageFullscreenModal bind:showModal={showImageFullscreenModal} />
