<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import { ToastType } from "../../ToastType";
    import { CircleAlert, CircleCheck } from "lucide-svelte";

    const dispatch = createEventDispatcher();

    export let type: ToastType;
    export let dismissible = true;
</script>

<div
    id="toast-success"
    class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow pointer-events-auto dark:text-gray-400 dark:bg-gray-800"
    role="alert"
    transition:fade
>
    {#if type === ToastType.SUCCESS}
        <CircleCheck />
    {:else if type === ToastType.ERROR}
        <CircleAlert />
    {:else if type === ToastType.DANGER}
        <CircleAlert />
    {/if}

    <div class="ms-3 text-sm font-normal"><slot></slot></div>
    {#if dismissible}
        <button
            on:click={() => dispatch("dismiss")}
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
        >
            <span class="sr-only">Close</span>
            ✕
        </button>
    {/if}
</div>
