<script lang="ts">
  let {
    year,
    projectsCount,
  }: {
    year: string;
    projectsCount: number;
  } = $props();
</script>

<div
  id="card"
  class="shadow-xl bg-primary rounded-box text-primary-content font-mono w-full h-full flex flex-col justify-end items-end gap-2 scale-90 p-6"
>
  <h2 class="text-6xl font-black">
    {year}
  </h2>
  <span class="text-xl">
    {projectsCount} projects
  </span>
</div>
