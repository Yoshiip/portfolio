<script lang="ts">
  import { onMount } from "svelte";

  let canvas = $state<HTMLCanvasElement>();
  let ctx: CanvasRenderingContext2D | null;

  type Circle = {
    x: number;
    y: number;
    radius: number;
  };

  let circles = $state<Circle[]>([]);

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      draw();
    }
  }

  function draw() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    circles.forEach((c) => {
      if (!canvas || !ctx) return;
      ctx.beginPath();
      ctx.arc(
        c.x / 2,
        c.y / 2,
        c.radius * (window.devicePixelRatio || 1),
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  }

  onMount(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    for (let index = 0; index < 10; index++) {
      circles.push({
        x: Math.random() * 300,
        y: Math.random() * 300,
        radius: 20,
      });
    }
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  });
</script>

<canvas class="blur-xl" bind:this={canvas}></canvas>

<style>
  canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
