<script lang="ts">
    import { onNavigate } from "$app/navigation";
    import "tailwindcss/tailwind.css";

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
</script>

<slot />
