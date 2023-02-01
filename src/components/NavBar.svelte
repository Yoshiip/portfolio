<link rel="stylesheet" href="css/navbar.css">


<script>
    import { blur } from 'svelte/transition';
    import {page} from '$app/stores'

    let page_name = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'));
</script>


<div class="navigation" transition:blur>
    <ul>
        <li class:active="{page_name === "/"}"><a href="/">Accueil</a></li>
        <li class:active="{page_name === "/about"}"><a href="about">À propos</a></li>
        <li class:active="{page_name === "/projects"}"><a href="projects">Projets</a></li>
        <li class:active="{page_name === "/credits"}"><a href="credits">Crédits</a></li>
    </ul>
</div>