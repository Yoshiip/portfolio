<script lang="ts">
    export let year: string;
    export let projectsCount: number;

    let rotation = ["-rotate-3", "-rotate-2", "rotate-2", "rotate-3"][
        Math.floor(Math.random() * 4)
    ];
</script>

<div
    class="{rotation} bg-swag shadow-xl focus:ring-4 ring-primary bg-primary text-white font-mono w-full h-full flex flex-col justify-end items-end gap-2 scale-90 p-6 rotate-{rotation}"
>
    <h2 class="text-6xl font-black">
        {year}
    </h2>
    <span class="text-xl">
        {projectsCount} projets
    </span>
</div>

<style>
    .bg-swag {
        background-image: url("/images/circuit-board.svg");
    }
</style>
