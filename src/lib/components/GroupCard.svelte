<script lang="ts">
    export let title: string;
</script>

<div class="card bg-base-100">
    <div class="card-body">
        <h1>{title}</h1>
        <div class="bg-base-300 rounded shadow-inner">
            <slot name="icons"></slot>
        </div>
    </div>
</div>
