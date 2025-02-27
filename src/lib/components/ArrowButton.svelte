<script lang="ts">
    import { ArrowLeft, ArrowRight } from "lucide-svelte";
    interface Props {
        onClick?: any;
        direction?: string;
    }

    let { onClick = () => {}, direction = "left" }: Props = $props();
</script>

<button
    class="flex items-center justify-center bg-white text-black size-12 rounded-full hover:bg-slate-100 hover:shadow-sm"
    onclick={onClick}
>
    {#if direction === "left"}
        <ArrowLeft />
    {:else}
        <ArrowRight />
    {/if}
</button>
