<script>
    import {page} from '$app/stores'
    import { onMount } from 'svelte';

    let page_name = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'));
    onMount(() => {
        console.log(page_name);
    })
</script>

<nav>
    <ul>
        <img src="/images/home/yoshi_noir.png" alt="" srcset="">
        <li class:selected={page_name === "/"}><a href="/">Accueil</a></li>
        <li class:selected={page_name === "/projects"}><a href="/projects">Réalisations</a></li>
        <li class:selected={page_name === "/skills"}><a href="/skills">Compétences</a></li>
    </ul>
</nav>



<slot/>

<style>
    nav {
        
        position: fixed;
        top: 8px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 440px;
        height: 44px;
        background-color: white;
        border-radius: 128px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        font-family: Arial, Helvetica, sans-serif;
        color: black;
        z-index: 3;
    }

    nav img {
        position: absolute;
        left: 8px;
    }

    nav li {
        transition: 0.1s;
        border-radius: 20px;
        padding: 8px;
    }
    
    nav li:hover {
        background-color: black;
        color: white;
    }

    nav a {
        text-decoration: none;
        color:unset;
    }

    nav a .selected {
        background-color: black;
        color: white;
    }

    nav ul {
        margin: 0;
    }

    nav img {
        width: 36px;
        vertical-align: middle;
        border-radius: 128px;
    }

    nav ul li {
        margin-left: 8px;
        margin-right: 8px;
        display: inline-block;
    }
</style>