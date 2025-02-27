<script lang="ts">
    import { Star } from "lucide-svelte";

    let { href, background, children } = $props();
</script>

<a
    {href}
    style="background-image: url({background})"
    class="flex justify-end p-4 text-xl font-black hover:-translate-y-2 transition-all flex-col text-gray-950 w-56 h-28 bg-cover rounded-xl shadow-sm hover:shadow-xl hover:brightness-110"
>
    {@render children?.()}
</a>
