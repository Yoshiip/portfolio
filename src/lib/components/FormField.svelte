<script lang="ts">
    interface Props {
        label: string;
        required?: boolean;
        children?: import('svelte').Snippet;
    }

    let { label, required = false, children }: Props = $props();
</script>

<div>
    <div class="label">
        <span class="label-text">{label}</span>
        {#if required}
            <div class="tooltip" data-tip="Ce champ est obligatoire">
                <span class="text-red-500">*</span>
            </div>
        {/if}
    </div>
    {@render children?.()}
</div>
