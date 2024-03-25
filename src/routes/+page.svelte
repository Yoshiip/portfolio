<script>
  import { onMount } from "svelte";

  $: outerWidth = 0;
  $: outerHeight = 0;

  /**
   * @type {number}
   */
  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;

  const clamp = (
    /** @type {number} */ num,
    /** @type {number} */ min,
    /** @type {number} */ max
  ) => Math.min(Math.max(num, min), max);

  /**
   * @param {number} start
   * @param {number} end
   * @param {number} progress
   */
  function lerp(start, end, progress) {
    return (1.0 - progress) * start + progress * end;
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
    mouseX = clamp(
      ((event.clientX - containerRect.left) / outerWidth) * 64,
      0,
      containerRect.width - 24
    );
    mouseY = clamp(
      ((event.clientY - containerRect.top + 80) / outerHeight) * 64,
      0,
      containerRect.height - 24
    );
  }

  function moveCircle() {
    circleX = lerp(circleX, mouseX, 0.025);
    circleY = lerp(circleY, mouseY, 0.025);
  }

  onMount(() => {
    setInterval(moveCircle, 1000.0 / 60.0);
  });
</script>

<svelte:head>
  <title>Portfolio • Tourneur Aymeri</title>
  <meta name="description" content="Portfolio de Tourneur Aymeri" />
</svelte:head>

<svelte:window bind:outerWidth bind:outerHeight />

<div class="background" style="background-position: 0 {circleY}%"></div>
<main on:mousemove={handleMouseMove}>
  <div style="position: relative;">
    <img src="/images/home/logo.svg" alt="" srcset="" />
    <div bind:this={container} class="eye_box dekstop">
      <div
        class="eye"
        style="left: {mouseX}px; top: {mouseY}px; border-width: 2px; border-color: gray;"
      ></div>
      <div class="eye" style="left: {circleX}px; top: {circleY}px;"></div>
      <img
        src="/images/home/yoshi_noir.png"
        unselectable="on"
        alt=""
        srcset=""
        class="start_yoshi"
      />
    </div>
  </div>
  <p>
    Je suis un étudiant en 2ème année de <strong>BUT Informatique</strong>, à
    l'Université de Lille.<br />
    Sur ce site, vous retrouverez les <strong>projets</strong> que j'ai pu
    réaliser, ainsi que mes <strong>compétences</strong>.<br />
  </p>
  <h4>Stage</h4>
  <p>
    Je recherche actuellement un stage à partir de mi-avril/mai/début juin<br />
    Pour une durée de 10 semaines, avec si possible
    <strong>poursuite en alternance</strong><br />
  </p>

  <a
    class="stylized_button"
    href="/projects/"
    style="background-image: url('/images/home/projects_button_background.jpg');"
  >
    <div>
      <img src="/images/icons/star.svg" alt="" srcset="" />
      Projets
    </div>
  </a>
  <a
    class="stylized_button"
    href="/skills/"
    style="background-image: url('/images/home/skills_button_background.jpg');"
  >
    <div>
      <img src="/images/icons/star.svg" alt="" srcset="" />
      Compétences
    </div>
  </a>
  <h2>Liens</h2>
  <a href="https://github.com/Yoshiip" target="_blank" class="link_button">
    <div class="text">
      <img src="/images/icons/github.png" alt="" srcset="" />
      <span class="title">GitHub</span>
      <span class="subtext">/Yoshiip</span>
    </div>
    <img src="/images/icons/open.svg" alt="" srcset="" />
  </a>
  <a href="mailto:aymeri.tourneur.etu@univ-lille.fr" class="link_button">
    <div class="text">
      <img src="/images/icons/mail.svg" alt="" srcset="" />
      <span class="title">Mail</span>
      <span class="subtext">Me contacter</span>
    </div>
    <img src="/images/icons/open.svg" alt="" srcset="" />
  </a>
</main>

<img src="/images/home/side.svg" class="side" alt="" srcset="" />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");

  main {
    margin: 20px;
    margin-top: 80px;
  }

  .background {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -5;
    background-image: url("/images/home/background.jpg");
  }

  .eye_box {
    width: 64px;
    height: 64px;
    color: white;
    border: 4px solid black;

    position: absolute;
    left: 0px;
    bottom: 20px;
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

  .start_yoshi {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    opacity: 0;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
    animation: fade 5s 1;

    user-select: none;
    pointer-events: none;
  }

  @keyframes fade {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .link_button {
    display: inline-block;
    width: 220px;
    height: 100px;
    padding: 10px;
    background-color: #191a1e;
    border-radius: 8px;
    color: white;
    text-decoration: none;
    position: relative;
  }

  .link_button:hover {
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  }

  .link_button > .text > img {
    width: 24px;
    display: block;
  }

  .link_button > .text {
    position: absolute;
    bottom: 16px;
  }

  .link_button > .text > .title {
    font-size: 1.5em;
  }

  .link_button > .text > .subtext {
    display: block;
    font-family: "Space Mono", monospace;
    color: gray;
  }

  .link_button > img {
    position: absolute;
    top: 4px;
    right: 4px;
  }

  .stylized_button {
    width: 240px;
    height: 120px;
    display: inline-block;
    border-radius: 8px;
    background-size: cover;

    background-position: 0% 0%;
    text-decoration: none;
    position: relative;
    transition: 0.3s;
  }
  .stylized_button:hover {
    background-position: 100%;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  }

  .stylized_button > div > img {
    width: 24px;
    display: block;
  }

  .stylized_button > div {
    color: #191a1e;
    font-weight: 800;
    font-size: 1.5em;
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  .side {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
  }

  h4,
  p {
    margin: 4px;
    padding: 4px;
  }

  @media screen and (max-width: 1024px) {
    .side {
      display: none;
    }
  }
</style>
