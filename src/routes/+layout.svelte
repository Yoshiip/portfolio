<script>
    import { page } from '$app/stores'
</script>

<nav>
    <ul>
        <img src="/images/home/yoshi_noir.png" class="avatar" alt="Website icon">
        <li class:selected={$page.url.pathname === "/"}><a href="/">Accueil</a></li>
        <li class:selected={$page.url.pathname === "/projects/"}><a href="/projects">Projets</a></li>
        <li class:selected={$page.url.pathname === "/skills/"}><a href="/skills">Compétences</a></li>
        <!-- <li>
            <img src="/images/icons/github_black.png" alt="GitHub" srcset="">
        </li>
        <li>
            <img src="/images/icons/mail.svg" alt="Mail" srcset="">
        </li> -->
    </ul>
</nav>



<slot/>

{#if $page.url.pathname != "/"}
    <footer>        
        <div class="made_with">
            <span>Fait avec</span> <img src="/images/tools/svelte.svg" style="" alt="" srcset="" width="16"> <span>Svelte</span>
        </div>
    </footer>
{/if}

<style>
    @import '$lib/style.css';
    
    nav {
        position: fixed;
        top: 8px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 400px;
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

    /* li img {
        width: 24px;
    } */

    ul > img {
        position: absolute;
        left: 8px;
    }

    li {
        transition: 0.1s;
        border-radius: 20px;
        padding: 8px;
    }
    
    li:hover {
        background-color: black;
        color: white;
    }

    a {
        text-decoration: none;
        color: unset;
    }

    .selected {
        background-color: black;
        color: white;
    }

    ul {
        margin: 0;
    }

    .avatar {
        width: 36px;
        vertical-align: middle;
        border-radius: 128px;
    }

    ul li {
        margin-left: 8px;
        margin-right: 8px;
        display: inline-block;
    }


    footer {
        width: 100%;
        display: flex;
        padding-top: 32px;
        padding-bottom: 32px;
        background: linear-gradient(180deg, rgb(37, 37, 37), rgb(15, 15, 15));
        color: white;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    footer > .made_with {
        margin: 8px;
    }
</style>