<script lang="ts">
    import FormField from "$lib/components/FormField.svelte";
    import { pb } from "$lib/pocketbase";
    import { CircleX } from "lucide-svelte";
    import { onMount } from "svelte";

    let error: string;
    let username: string;
    let password: string;

    function login() {
        pb.collection("users")
            .authWithPassword(username, password)
            .then(() => {
                window.location.href = "/dashboard";
            })
            .catch((e) => {
                console.error(e);
                error = "Nom d'utilisateur ou mot de passe incorrect";
            });
    }

    onMount(() => {
        if (pb.authStore.isValid) {
            window.location.href = "/dashboard";
        }
    });
</script>

<div
    class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
>
    <div
        class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"
    ></div>
</div>

<main class="flex items-center justify-center h-full">
    <div class="card w-full max-w-md bg-base-100 p-8 shadow-xl">
        <h2 class="text-xl font-bold mt-6 mb-3">Connectez-vous</h2>
        {#if error}
            <div role="alert" class="alert alert-error">
                <CircleX class="size-4" />
                {error}
            </div>
        {/if}
        <form
            on:submit={login}
            on:submit|preventDefault
            class="flex flex-col gap-4"
        >
            <FormField label="Nom d'utilisateur" required>
                <input
                    placeholder="Nom d'utilisateur"
                    type="text"
                    bind:value={username}
                    class="input input-bordered w-full"
                    required
                />
            </FormField>

            <FormField label="Mot de passe" required>
                <input
                    placeholder="Mot de passe"
                    type="password"
                    bind:value={password}
                    class="input input-bordered w-full"
                    required
                />
            </FormField>
            <input type="submit" class="btn btn-primary" />
        </form>
    </div>
</main>
