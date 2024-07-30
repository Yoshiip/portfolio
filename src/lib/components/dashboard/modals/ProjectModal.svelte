<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import type { RecordModel } from "pocketbase";
    import { onMount } from "svelte";
    import FormField from "../../FormField.svelte";
    import { Link, Pen } from "lucide-svelte";
    import PlusButton from "../PlusButton.svelte";
    import ImageModal from "./ImageModal.svelte";
    import SkillModal from "./SkillModal.svelte";

    export let editingId: string = "";

    let modal: HTMLDialogElement;

    let showImageModal: (imageId: string) => void;
    let showSkillModal: (skillId: string) => void;

    export const showModal = (recordId: string) => {
        modal.showModal();
        editingId = recordId;
        if (editingId) {
            pb.collection("projects")
                .getOne(editingId)
                .then((record) => {
                    name = record.name;
                    description = record.description;
                    date = record.date;
                    url = record.url;
                    skillsActive = record.skills;
                    imagesActive = record.images;
                });
        }
    };

    let name: string;
    let description: string;
    let date = new Date().toISOString().split("T")[0];
    let url = "";

    function createProject() {
        const data = {
            name,
            description,
            date,
            images: imagesActive,
            skills: skillsActive,
            url,
        };
        pb.collection("projects").create(data);
        modal.close();
    }

    function updateProject() {
        const data = {
            name,
            description,
            date,
            images: imagesActive,
            skills: skillsActive,
            url,
        };
        pb.collection("projects").update(editingId, data);
        modal.close();
    }

    function onFormSubmit(e: Event) {
        e.preventDefault();
        if (editingId) {
            updateProject();
        } else {
            createProject();
        }
    }

    let skills: RecordModel[] = [];
    let images: RecordModel[] = [];

    let skillsActive: string[] = [];
    let imagesActive: string[] = [];

    onMount(() => {
        pb.collection("skills")
            .getFullList()
            .then((res) => {
                skills = res;
            });
        pb.collection("images")
            .getFullList()
            .then((res) => {
                images = res;
            });
    });

    function skillCheckboxChanged(e: Event) {
        const target = e.target as HTMLInputElement;
        const id = target.dataset.id;
        if (!id) return;
        if (target.checked) {
            skillsActive = [...skillsActive, id];
        } else {
            skillsActive = skillsActive.filter((skill) => skill !== id);
        }
    }

    function imageCheckboxChanged(e: Event) {
        const target = e.target as HTMLInputElement;
        const id = target.dataset.id;
        if (!id) return;
        if (target.checked) {
            imagesActive = [...imagesActive, id];
        } else {
            imagesActive = imagesActive.filter((image) => image !== id);
        }
    }

    function onSkillsPlusClick() {
        showImageModal("");
    }

    function onImagesPlusClick() {
        showSkillModal("");
    }
</script>

<dialog bind:this={modal} class="modal modal-bottom sm:modal-middle">
    <div class="modal-box modal-scroll">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        {#if editingId}
            <h3 class="text-lg font-bold">Modifier le projet</h3>
        {:else}
            <h3 class="text-lg font-bold">Créer un projet</h3>
        {/if}
        <form
            on:submit={onFormSubmit}
            on:submit|preventDefault
            class="flex flex-col gap-2"
        >
            <FormField label="Nom" required>
                <input
                    type="text"
                    bind:value={name}
                    placeholder="Nom"
                    class="input input-bordered"
                />
            </FormField>
            <FormField label="Description">
                <textarea
                    bind:value={description}
                    placeholder="Description"
                    class="textarea textarea-bordered"
                ></textarea>
            </FormField>
            <FormField label="Date" required>
                <input
                    type="date"
                    bind:value={date}
                    placeholder="Date"
                    class="input input-bordered"
                />
            </FormField>
            <FormField label="URL" required>
                <label class="input input-bordered flex items-center gap-2">
                    <Link class="size-4 text-slate-600" />
                    <input
                        type="url"
                        class="grow"
                        placeholder="URL"
                        bind:value={url}
                    />
                </label>
            </FormField>
            <div class="border dark:border-gray-700 rounded-xl p-2">
                <div class="label">
                    <span class="label-text">Compétences</span>
                </div>
                <div class="grid gap-4 grid-cols-6">
                    {#each skills as skill}
                        <div class="tooltip" data-tip={skill.name}>
                            <label class="relative w-8 h-8">
                                <input
                                    type="checkbox"
                                    checked={skillsActive.includes(skill.id)}
                                    on:change={(e) => skillCheckboxChanged(e)}
                                    data-id={skill.id}
                                    class="hidden peer"
                                />
                                <img
                                    class="w-full h-full rounded-xl peer-active:scale-90 transition-transform peer-checked:ring-2 peer-checked:ring-primary hover:bg-base-200"
                                    src={pb.files.getUrl(skill, skill.image, {
                                        thumb: "128x128",
                                    })}
                                    alt={skill.name}
                                />
                            </label>
                        </div>
                    {/each}
                    <PlusButton onClick={onSkillsPlusClick} />
                </div>
            </div>
            <div class="border dark:border-gray-700 rounded-xl p-2">
                <div class="label">
                    <span class="label-text">Images</span>
                </div>
                <div class="grid grid-cols-4 gap-4">
                    {#each images as image}
                        <label class="relative w-24 aspect-video">
                            <input
                                type="checkbox"
                                data-id={image.id}
                                class="hidden peer"
                                checked={imagesActive.includes(image.id)}
                                on:change={(e) => imageCheckboxChanged(e)}
                            />
                            <img
                                class="w-full h-full rounded-xl peer-active:scale-90 transition-transform peer-checked:ring-2 peer-checked:ring-primary hover:bg-base-200"
                                src={pb.files.getUrl(image, image.image, {
                                    thumb: "128x128",
                                })}
                                alt={image.name}
                            />
                            {#if imagesActive.includes(image.id)}
                                <span class="badge absolute bottom-1 right-1"
                                    >n°{imagesActive.indexOf(image.id) +
                                        1}</span
                                >
                            {/if}
                        </label>
                    {/each}
                    <PlusButton onClick={onImagesPlusClick} />
                </div>
            </div>
            <input
                type="submit"
                class="btn btn-primary"
                on:click={createProject}
            />
        </form>
    </div>
</dialog>

<ImageModal bind:showModal={showImageModal} />
<SkillModal bind:showModal={showSkillModal} />
