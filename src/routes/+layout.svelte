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

<svelte:head>
  <script
    defer
    data-domain="aymeri.dev"
    src="https://plausible.aymeri.dev/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
  ></script>
  <script>
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
  </script>
</svelte:head>

<slot></slot>
