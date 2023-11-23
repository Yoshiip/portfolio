<link rel="stylesheet" href="css/style.css">
<title>Tourneur Aymeri</title>

<div class="background"></div>

<script>
    import { fade, blur, fly, slide, scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { onMount, onDestroy } from "svelte";

    $: outerWidth = 0
	$: outerHeight = 0

    const clamp = (/** @type {number} */ num, /** @type {number} */ min, /** @type {number} */ max) => Math.min(Math.max(num, min), max);


    /**
     * @param {number} start
     * @param {number} end
     * @param {number} progress
     */
    function lerp (start, end, progress){
        return (1.0-progress)*start+progress*end
    }


    /**
     * @type {number}
     */
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    /**
     * @type {Element | null}
     */
    let container;
  
    /**
     * @param {{ clientX: number; clientY: number; }} event
     */
    function handleMouseMove(event) {
      // @ts-ignore
      const containerRect = container.getBoundingClientRect();
      mouseX = clamp((event.clientX - containerRect.left) / outerWidth * 64, 0, containerRect.width - 24);
      mouseY = clamp((event.clientY - containerRect.top + 80) / outerHeight * 64, 0, containerRect.height - 24);
    }

    function moveCircle() {
        circleX = lerp(circleX, mouseX, 0.025);
        circleY = lerp(circleY, mouseY, 0.025);
    }

    /**
     * @param {number | undefined} ms
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    onMount(() => {
        show = true;
        window.addEventListener("mousemove", handleMouseMove);

        setInterval (moveCircle,1000.0 / 60.0);
        
        onDestroy(() => {
            window.removeEventListener("mousemove", handleMouseMove);
        });
    });

    let show = false;
  </script>

<style>
    .eye_box {
        width: 64px;
        height: 64px;
        color: white;
        border: 4px solid black;
        position: relative;
        display: inline-block;
    }

    .eye {
        border-radius: 16px;
        border: 4px solid black;
        width: 8px;
        height: 8px;
        position: absolute;
        background-color: white;
    }
</style>

<svelte:window bind:outerWidth bind:outerHeight/>

{#if show}
<main>
    <div transition:blur={{ duration: 2500, easing: quintOut }}>
        <h1>TOURNEUR</h1>
        <div bind:this={container} class="eye_box">
            <div class="eye" style="left: {mouseX}px; top: {mouseY}px; border-width: 2px; border-color: gray;"></div>
            <div class="eye" style="left: {circleX}px; top: {circleY}px;"></div>
            <img src="/images/home/yoshi_noir.png" alt="" srcset="" class="start_yoshi">
        </div>
        <h1 class="h1_outlined" style="display: inline-block; text-align: right;">AYMERI</h1>
    </div>
    <p transition:slide={{delay: 500, duration: 1000, easing: quintOut }}>
        Je suis un étudiant en 2ème année de BUT Informatique, à l'<strong>Université de Lille</strong>.<br>
        Je recherche actuellement un stage d'une durée de <strong>10 semaines</strong>, à partir du 10 avril 2023.<br>
        Sur ce site, vous retrouverez les projets que j'ai pu réalisé.<br>
    </p>
    
    <a class="projects_button" href="/projects/" transition:fade={{delay: 500}}>
        <div>
            <img src="/images/icons/star.svg" alt="" srcset="">
            Mes projets
        </div>
    </a>
    <h2 transition:fade={{delay: 625}}>Liens</h2>
    <a href="https://github.com/Yoshiip" target="_blank" class="link_button" transition:fade={{delay: 750}}>
        <div class="text">
            <img src="/images/icons/github.png" alt="" srcset="">
            <span class="title">GitHub</span>
            <span class="subtext">/Yoshiip</span>
        </div>
        <img src="/images/icons/open.svg" alt="" srcset="">
    </a>
    <a href="mailto:yoshiip59@gmail.com" class="link_button" transition:fade={{delay: 1000}}>
        <div class="text">
            <img src="/images/icons/mail.svg" alt="" srcset="">
            <span class="title">Mail</span>
            <span class="subtext">yoshiip59@gmail.com</span>
        </div>
        <img src="/images/icons/open.svg" alt="" srcset="">
    </a>
</main>

<img transition:fade src="/images/home/side.svg" class="side" alt="" srcset="">
{/if}
