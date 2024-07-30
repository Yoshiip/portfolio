<script lang="ts">
    import SkillModal from "$lib/components/dashboard/modals/SkillModal.svelte";
    import { pb } from "$lib/pocketbase";
    import { onDestroy, onMount } from "svelte";
    import type { RecordModel } from "pocketbase";
    import { camelToTitleCase } from "../../../stores/utils";

    let showModal: (editingId: string) => void;

    let skills: RecordModel[] = [];

    onMount(async () => {
        pb.collection("skills").subscribe("*", (e) => {
            switch (e.action) {
                case "create":
                    skills.push(e.record);
                    break;
                case "update":
                    const index = skills.findIndex((i) => i.id === e.record.id);
                    skills[index] = e.record;
                    break;
                case "delete":
                    skills = skills.filter((i) => i.id !== e.record.id);
                    break;
            }
        });
        skills = await pb.collection("skills").getFullList();
    });

    onDestroy(() => {
        pb.collection("skills").unsubscribe();
    });

    function deleteSkill(skillId: string) {
        pb.collection("skills").delete(skillId);
    }
</script>

<button on:click={() => showModal("")} class="btn btn-primary"
    >Nouvelle compétence</button
>

<SkillModal bind:showModal />

<div class="overflow-x-auto">
    <table class="table">
        <thead>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <th>Name</th>
                <th>Master ?</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each skills as skill}
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                    </th>
                    <td>
                        <div class="flex items-center gap-3">
                            <div class="avatar">
                                <img
                                    src={pb.files.getUrl(skill, skill.image, {
                                        thumb: "128x128",
                                    })}
                                    class="max-w-8 max-h-8 object-cover"
                                    alt={skill.name}
                                />
                            </div>
                            <div>
                                <div class="font-bold">{skill.name}</div>
                                <span class="badge"
                                    >{camelToTitleCase(skill.type)}</span
                                >
                            </div>
                        </div>
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            checked={skill.master}
                            disabled
                        />
                    </td>
                    <th>
                        <button
                            on:click={() => {
                                showModal(skill.id);
                            }}
                            class="btn btn-ghost btn-xs">Edit</button
                        >
                        <button
                            on:click={() => {
                                deleteSkill(skill.id);
                            }}
                            class="btn btn-ghost btn-xs">Delete</button
                        >
                    </th>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
