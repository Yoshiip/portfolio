<script lang="ts">
    export let label: string;
    export let required: boolean = false;
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
    <slot></slot>
</div>
