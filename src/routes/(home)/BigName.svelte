<script lang="ts">
  import { onMount, tick } from "svelte";
  import Letter from "./Letter.svelte";
  import gsap from "gsap";

  onMount(async () => {
    await tick();
    const letters = document.querySelectorAll("path");

    gsap.fromTo(
      letters,
      {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.inOut",
        translateY: 10,
      },
      {
        autoAlpha: 1,
        stagger: 0.15,
        translateY: 0,
      }
    );
  });
</script>

<svg
  width="1137"
  height="250"
  viewBox="0 0 1137 250"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_800_175)">
    <Letter
      id="letterA"
      d="M0 250L124.254 0L248 250H206.413L186.634 209.432H28.4008L8.62168 250H0ZM107.517 50.2028L31.4438 202.84H183.084L107.517 50.2028Z"
      evenodd
    />

    <Letter
      id="letterY"
      d="M345.209 114.823V250H383.407V111.691L453 0H444.628L380.791 102.296L315.907 0H273L345.209 114.823Z"
    />
    <Letter
      id="letterM"
      d="M478 0V250L485.771 249.821V58.4886L591.452 155.279L684.183 53.3126V250H722V0.517598L611.138 122.671L478 0Z"
    />
    <Letter
      id="letterE"
      d="M838.65 250H747V0L835.324 0.277269V7.04455H785.278V77.7667H860V84.5517H785.535V242.693H838.65V250Z"
    />
    <Letter
      id="letterR"
      d="M885 0.0114397V249.478H923.063V89.0704L1081.57 250H1092C1039.86 194.1 928.019 82.2999 927.756 82.2999C919.935 82.2999 955.39 80.2159 955.39 39.5928C955.39 7.09443 921.053 -0.335766 903.885 0.0114397H885Z"
    />
    <Letter id="letterI" d="M1117 0V250H1156V0H1117Z" />
  </g>
  <defs>
    <clipPath id="clip0_800_175">
      <rect width="1137" height="250" fill="white" />
    </clipPath>
  </defs>
</svg>
