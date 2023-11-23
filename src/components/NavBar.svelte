<link rel="stylesheet" href="css/navbar.css">


<script>
    import { fly } from 'svelte/transition';
    import {page} from '$app/stores'

    let page_name = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'));
</script>


<div class="navigation" transition:fly>
    <ul>
        <li class:active="{page_name === "/"}"><a href="/">Accueil</a></li>
        <li class:active="{page_name === "/about"}"><a href="about">À propos</a></li>
        <li class:active="{page_name === "/projects"}"><a href="projects">Projets</a></li>
    </ul>
</div>