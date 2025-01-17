<script>
  import { page } from "$app/stores";
  import { Github, GithubIcon, LucideGithub } from "lucide-svelte";

  let routes = {
    "/": "Accueil",
    "/projects": "Projets",
    "/skills": "Compétences",
  };
</script>

<div
  class="flex items-center bg-base-100 mt-4 pl-8 pr-8 justify-center gap-4 p-2 shadow rounded-full w-min m-auto"
>
  {#each Object.entries(routes) as [route, name]}
    <a
      href={route}
      class="btn rounded-full"
      class:btn-primary={$page.url.pathname === route}
      class:btn-ghost={$page.url.pathname !== route}
    >
      {name}
    </a>
  {/each}
  <div class="tooltip tooltip-bottom" data-tip="GitHub">
    <a href="https://github.com/Yoshiip" class="btn btn-ghost btn-circle">
      <LucideGithub />
    </a>
  </div>
  <div class="tooltip tooltip-bottom" data-tip="Aymeri's 100">
    <a
      href="https://aymeri100.fr"
      target="_blank"
      class="btn btn-ghost btn-circle"
    >
      <img class="w-8 h-8" src="https://aymeri100.fr/favicon.png" />
    </a>
  </div>
</div>
