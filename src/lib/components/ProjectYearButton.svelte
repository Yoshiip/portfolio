<script lang="ts">
    export let year: string;
    export let projectsCount: number;

    export let filterProjectByYear: (year: string) => void;

    let rotation = ["-rotate-3", "-rotate-2", "rotate-2", "rotate-3"][
        Math.floor(Math.random() * 4)
    ];
</script>

<div class="w-full h-full tooltip" data-tip={`Projets fait en ${year}`}>
    <button
        class="{rotation} btn bg-swag shadow-xl active:shadow-inner focus:ring-4 ring-primary bg-primary text-white hover:bg-primary font-mono w-full h-full flex flex-col justify-end items-end gap-2 scale-90 p-6 rotate-{rotation} hover:rotate-0 active:scale-75 transition-all"
        on:click={() => filterProjectByYear(year)}
    >
        <div class="flex gap-2">
            {#each Array.from({ length: projectsCount }) as _, i}
                <div class="size-4 bg-white opacity-50 rounded-full"></div>
            {/each}
        </div>
        <h2 class="text-6xl font-black">
            {year}
        </h2>
        <span class="text-xl">
            {projectsCount} projets
        </span>
    </button>
</div>

<style>
    .bg-swag {
        background-image: url("/images/circuit-board.svg");
    }
</style>
