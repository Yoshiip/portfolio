<script>
    import { ArrowLeft, ArrowRight } from "lucide-svelte";
    export let onClick = () => {};
    export let direction = "left";
</script>

<button
    class="flex items-center justify-center bg-white text-black size-12 rounded-full hover:bg-slate-100 hover:shadow"
    on:click={onClick}
>
    {#if direction === "left"}
        <ArrowLeft />
    {:else}
        <ArrowRight />
    {/if}
</button>
