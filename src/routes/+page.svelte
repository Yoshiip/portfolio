<link rel="stylesheet" href="css/index.css">

<script>
    import { onMount } from 'svelte';
    import { blur } from 'svelte/transition';
    import NavBar from "../components/NavBar.svelte";
    let visible = false
    onMount(()=>{
    requestAnimationFrame(()=>{
        setTimeout(()=>{
            visible = true
        }, 0)
    })
})
</script>


<title>Tourneur Aymeri</title>

{#if visible}


<div class="inside_border"></div>
<img src="/images/home/copyright.png" class="copyright">
<img src="/images/home/yoshiip.jpg" class="yoshiip">
<div class="header" transition:blur>
    <img src="images/home/name.png" class="name" alt="Tourneur Aymeri">
    <a href="https://github.com/Yoshiip"><img src="images/icons/github.png" alt="Github" class="github"></a>
</div>
{/if}

<NavBar/>