<script lang="ts">
    import { page } from "$app/stores";
    import Toasts from "$lib/components/toasts/Toasts.svelte";
    import { pb } from "$lib/pocketbase";
    import { ArrowLeft, Menu } from "lucide-svelte";
    import { onMount } from "svelte";

    onMount(() => {
        if (!pb.authStore.isValid && $page.url.pathname !== "/login") {
            window.location.href = "/login";
        } else if (pb.authStore.isValid && $page.url.pathname === "/login") {
            window.location.href = "/dashboard";
        }
    });

    let routes = {
        "/dashboard": "Home",
        "/dashboard/projects": "Projects",
        "/dashboard/images": "Images",
        "/dashboard/skills": "Skills",
    };
</script>

<div
    class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
></div>

<div class="drawer">
    <input id="menu-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col m-4">
        <div class="navbar bg-base-100 rounded-lg shadow-md border w-full">
            <div class="flex-none lg:hidden">
                <label
                    for="menu-drawer"
                    aria-label="open sidebar"
                    class="btn btn-square btn-ghost"
                >
                    <Menu />
                </label>
            </div>
            <div class="flex gap-4 mx-2 flex-1 px-2">
                <a href="/" class="btn btn-ghost hidden lg:flex">
                    <ArrowLeft class="size-4" />
                    Retour au portfolio
                </a>
                <span class="font-bold">Portfolio</span>
            </div>
            <div class="hidden flex-none lg:block">
                <ul class="menu menu-horizontal">
                    {#each Object.entries(routes) as [route, name]}
                        <li><a href={route}>{name}</a></li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="p-4">
            <slot></slot>
        </div>
    </div>
    <div class="drawer-side">
        <label
            for="menu-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
        ></label>
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
            {#each Object.entries(routes) as [route, name]}
                <li><a href={route}>{name}</a></li>
            {/each}
        </ul>
    </div>
</div>

<Toasts />
