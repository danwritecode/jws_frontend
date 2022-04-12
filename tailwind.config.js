module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'natural-black': "url('~/assets/img/ep_naturalblack.png')",
        'noisy-net': "url('~/assets/img/noisy_net.png')",
        'blackmamba': "url('~/assets/img/blackmamba.png')"
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
}
