<script lang="ts">
    import FormField from "$lib/components/FormField.svelte";
    import FormFileInput from "$lib/components/FormFileInput.svelte";
    import { pb } from "$lib/pocketbase";
    import { CircleX } from "lucide-svelte";
    import { SkillsTypeOptions } from "../../../../types/pocketbase-types";
    import { camelToTitleCase } from "../../../../stores/utils";

    let editingId: string = "";

    export const showModal = (recordId: string) => {
        modal.showModal();
        formData = new FormData();
        name = "";
        master = false;
        editingId = recordId;
        if (editingId) {
            pb.collection("skills")
                .getOne(editingId)
                .then((record) => {
                    currentRecord = record;
                    name = record.name;
                    master = record.master;
                    description = record.description;
                    type = record.type;
                });
        }
    };

    let currentRecord: any;

    let modal: HTMLDialogElement;

    let formData: FormData = new FormData();
    let name: string = "";
    let description: string = "";
    let master: boolean = false;
    let error: string = "";
    let type: string = "";

    function closeModal() {
        modal.close();
    }

    function onFileChange(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (!fileInput) return;
        if (!fileInput.files) return;
        for (let file of fileInput.files) {
            formData.set("image", file);
        }
    }

    function addBaseFormData() {
        formData.set("name", name);
        formData.set("description", description);
        formData.set("master", `${master}`);
        formData.set("type", type);
    }

    function createSkill() {
        try {
            addBaseFormData();
            pb.collection("skills").create(formData);
            modal.close();
        } catch (error) {
            console.error(error);
            error = "Une erreur est survenue";
        }
    }

    async function updateSkill() {
        try {
            addBaseFormData();
            const record = await pb
                .collection("skills")
                .update(editingId, formData);
            closeModal();
        } catch (error) {
            console.error(error);
            error = "Une erreur est survenue";
        }
    }

    function formSubmitted() {
        if (editingId) {
            updateSkill();
        } else {
            createSkill();
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
                <h3 class="text-lg font-bold">Modifier une compétence</h3>
            {:else}
                <h3 class="text-lg font-bold">Nouvelle compétence</h3>
            {/if}
            <FormField label="Name" required>
                <input
                    type="text"
                    bind:value={name}
                    placeholder="Name"
                    class="input input-bordered"
                    required
                />
            </FormField>
            <FormFileInput {onFileChange} />
            <FormField label="Description">
                <textarea
                    bind:value={description}
                    placeholder="Description"
                    class="textarea textarea-bordered"
                ></textarea>
            </FormField>
            <FormField label="Type" required>
                <select
                    class="select select-bordered w-full max-w-xs"
                    bind:value={type}
                >
                    <option disabled selected>Type</option>
                    {#each Object.keys(SkillsTypeOptions) as option}
                        <option value={option}
                            >{camelToTitleCase(option)}</option
                        >
                    {/each}
                </select>
            </FormField>
            <div class="form-control">
                <label class="label cursor-pointer">
                    <span class="label-text">Maîtrise</span>
                    <input
                        type="checkbox"
                        bind:checked={master}
                        class="checkbox"
                    />
                </label>
            </div>

            <input type="submit" class="btn btn-primary" />
        </form>
    </div>
</dialog>
