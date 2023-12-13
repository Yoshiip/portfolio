<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/home.css">

<title>Tourneur Aymeri</title>

<script>
    import { onMount } from "svelte";

    $: outerWidth = 0
	$: outerHeight = 0

    /**
     * @type {number}
     */
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

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
  
    onMount(() => {
        setInterval (moveCircle,1000.0 / 60.0);
    });
  </script>

<svelte:window bind:outerWidth bind:outerHeight/>

<div class="background" style="background-position: 0 {circleY}%"></div>
<main on:mousemove={handleMouseMove}>
    <div>
        <h1>TOURNEUR</h1>
        <div bind:this={container} class="eye_box dekstop">
            <div class="eye" style="left: {mouseX}px; top: {mouseY}px; border-width: 2px; border-color: gray;"></div>
            <div class="eye" style="left: {circleX}px; top: {circleY}px;"></div>
            <img src="/images/home/yoshi_noir.png" unselectable="on" alt="" srcset="" class="start_yoshi">
        </div>
        <h1 class="h1_outlined" style="display: inline-block; text-align: right;">AYMERI</h1>
    </div>
    <p>
        Je suis un étudiant en 2ème année de BUT Informatique, à l'<strong>Université de Lille</strong>.<br>
        Je recherche actuellement un stage d'une durée de <strong>10 semaines</strong>, à partir du 15 avril 2024.<br>
        Sur ce site, vous retrouverez les projets que j'ai pu réaliser.<br>
    </p>
    
    <a class="projects_button" href="/projects/">
        <div>
            <img src="/images/icons/star.svg" alt="" srcset="">
            Mes projets
        </div>
    </a>
    <a class="projects_button" href="/projects/">
        <div>
            <img src="/images/icons/star.svg" alt="" srcset="">
            Compétences
        </div>
    </a>
    <h2>Liens</h2>
    <a href="https://github.com/Yoshiip" target="_blank" class="link_button">
        <div class="text">
            <img src="/images/icons/github.png" alt="" srcset="">
            <span class="title">GitHub</span>
            <span class="subtext">/Yoshiip</span>
        </div>
        <img src="/images/icons/open.svg" alt="" srcset="">
    </a>
    <a href="mailto:yoshiip59@gmail.com" class="link_button">
        <div class="text">
            <img src="/images/icons/mail.svg" alt="" srcset="">
            <span class="title">Mail</span>
            <span class="subtext">Me contacter</span>
        </div>
        <img src="/images/icons/open.svg" alt="" srcset="">
    </a>
</main>

<img src="/images/home/side.svg" class="side" alt="" srcset="">