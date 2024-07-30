<script lang="ts">
    import { onNavigate } from "$app/navigation";
    import { Moon, Sun } from "lucide-svelte";
    import { onMount } from "svelte";
    import "tailwindcss/tailwind.css";
    import { dark } from "../stores/theme";

    onNavigate((navigation) => {
        // @ts-ignore
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            // @ts-ignore
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });

    onMount(() => {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (event) => {
                dark.set(event.matches);
            });
    });
</script>

<slot></slot>
