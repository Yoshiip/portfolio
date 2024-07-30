<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import { Upload } from "lucide-svelte";
    import { onMount } from "svelte";

    export let onFileChange: (event: Event) => void;
    export let label: string = "Image";
    export let currentFile: any = null;
    export let supportedFileTypes: string[] = ["png", "jpg", "jpeg", "svg"];
    export let maxFileSize: number = 5 * 1024 * 1024; // 5MB

    function formatBytes(bytes: number, decimals = 2): string {
        if (!+bytes) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["b", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
</script>

<div class="border rounded">
    {#if currentFile}
        <div class="tooltip" data-tip="Current file">
            <img
                src={pb.files.getUrl(currentFile, currentFile.image, {
                    thumb: "64x64",
                })}
                alt="Current file"
                class="w-full rounded-t"
            />
        </div>
    {/if}
    <div class="label">
        <span class="label-text flex gap-2 items-center">
            <Upload class="size-3" />
            {label}
        </span>
    </div>
    <input
        on:change={onFileChange}
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
    />
    <div class="label">
        <span class="label-text"
            >Taille maximale: {formatBytes(maxFileSize)}</span
        >
        <span class="label-text-alt text-slate-500"
            >{supportedFileTypes.join(", ")}</span
        >
    </div>
</div>
