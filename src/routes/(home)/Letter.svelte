<script lang="ts">
  let {
    d,
    evenodd = false,
    id,
  }: {
    d: string;
    evenodd?: boolean;
    id: string;
  } = $props();
</script>

{#if evenodd}
  <path {id} fill-rule="evenodd" clip-rule="evenodd" {d} fill="#FFDD00" />
{:else}
  <path {id} {d} fill="#FFDD00" />
{/if}
