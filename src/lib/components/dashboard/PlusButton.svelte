<script lang="ts">
    import { Plus } from "lucide-svelte";
    export let onClick: () => void;
</script>

<div class="tooltip" data-tip="Nouveau">
    <button
        on:click={onClick}
        class="w-full h-full flex items-center group justify-center rounded-xl border-dashed bg-gray-100 border-gray-400 border-2 hover:brightness-110 active:scale-90 transition-transform hover:border-primary hover:bg-primary-content"
    >
        <Plus class="text-gray-400 group-hover:text-primary" />
    </button>
</div>
