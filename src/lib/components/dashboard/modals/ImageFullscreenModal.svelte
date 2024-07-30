<script lang="ts">
    import { pb } from "$lib/pocketbase";

    export const showModal = (imageId: string) => {
        modal.showModal();
        pb.collection("images")
            .getOne(imageId)
            .then((res) => {
                src = pb.files.getUrl(res, res.image);
                alt = res.alt;
            });
    };

    let modal: HTMLDialogElement;

    let src: string = "";
    let alt: string = "";

    function closeModal() {
        modal.close();
    }
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
        <div class="flex flex-col gap-2">
            <img {src} {alt} class="w-full rounded-xl" />
            <div class="flex items-center">
                {#if alt}
                    <span class="flex-grow">{alt}</span>
                {/if}
                <button on:click={closeModal} class="btn">Retour</button>
            </div>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
