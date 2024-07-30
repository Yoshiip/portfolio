<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import { CircleX } from "lucide-svelte";
    import FormFileInput from "../../FormFileInput.svelte";
    import FormField from "../../FormField.svelte";

    export const showModal = (recordId: string) => {
        modal.showModal();
        formData = new FormData();
        alt = "";
        editingId = recordId;
        if (editingId) {
            pb.collection("images")
                .getOne(editingId)
                .then((record) => {
                    currentRecord = record;
                    alt = record.alt;
                });
        }
    };

    let currentRecord: any;
    let editingId: string = "";

    let modal: HTMLDialogElement;

    let formData: FormData = new FormData();
    let alt: string = "";
    let error: string = "";
    let fileInput: HTMLInputElement | null;

    function closeModal() {
        modal.close();
    }

    function fileChange(event: Event) {
        if (!fileInput) return;
        if (!fileInput.files) return;
        for (let file of fileInput.files) {
            formData.append("image", file);
        }
    }

    function createImage() {
        try {
            formData.append("alt", alt);
            pb.collection("images").create(formData);
            modal.close();
        } catch (error) {
            console.error(error);
            error = "Une erreur est survenue";
        }
    }

    async function updateImage() {
        try {
            formData.append("alt", alt);
            const record = await pb
                .collection("images")
                .update(editingId, formData);
            closeModal();
        } catch (error) {
            console.error(error);
            error = "Une erreur est survenue";
        }
    }

    function formSubmitted() {
        if (editingId) {
            updateImage();
        } else {
            createImage();
        }
    }
</script>

<dialog bind:this={modal} class="modal">
    <div class="modal-box">
        {#if error}
            <div role="alert" class="alert alert-error">
                <CircleX />
                <span>{error}</span>
            </div>
        {/if}
        <form
            on:submit={formSubmitted}
            on:submit|preventDefault
            class="flex flex-col gap-2"
        >
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                on:click={closeModal}>✕</button
            >
            {#if editingId}
                <h3 class="text-lg font-bold">Modifier une image</h3>
            {:else}
                <h3 class="text-lg font-bold">Téleverser une image</h3>
            {/if}
            <FormFileInput
                currentFile={currentRecord ? currentRecord.image : ""}
            />
            <!-- <input
                type="file"
                bind:this={fileInput}
                on:change={fileChange}
                class="file-input file-input-bordered w-full max-w-xs"
            /> -->
            <FormField label="Alt text">
                <input
                    type="text"
                    bind:value={alt}
                    placeholder="Alt"
                    class="input input-bordered"
                />
            </FormField>

            <input type="submit" class="btn btn-primary" />
        </form>
    </div>
</dialog>
