<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    href,
    children,
  }: {
    href: string;
    children: Snippet;
  } = $props();
</script>

<a
  {href}
  class="btn btn-primary flex justify-end p-4 text-xl font-black hover:-translate-y-2 transition-all flex-col w-56 h-28 rounded-xl shadow-sm hover:shadow-xl"
>
  {@render children?.()}
</a>
