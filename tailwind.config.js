import daisyui from "daisyui";

export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'card-year-pattern': "/images/circuit-board.svg",
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "emerald"
    ]
  }
}

