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
  class="btn flex bg-yellow-300 justify-end p-4 text-xl font-black hover:-translate-y-2 transition-all flex-col text-yellow-800 w-56 h-28 rounded-xl shadow-sm hover:shadow-xl"
>
  {@render children?.()}
</a>
