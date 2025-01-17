<script lang="ts">
    interface Props {
        title: string;
        icons?: import('svelte').Snippet;
    }

    let { title, icons }: Props = $props();
</script>

<div class="card bg-base-100">
    <div class="card-body">
        <h1>{title}</h1>
        <div class="bg-base-300 rounded shadow-inner">
            {@render icons?.()}
        </div>
    </div>
</div>
