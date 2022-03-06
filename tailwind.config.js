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
        'hero-pattern': "url('~/assets/img/testing_background.svg')",
        'webb-pattern': "url('~/assets/img/webb.png')",
        'dot-pattern': "url('~/assets/img/dot-grid.png')"
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ],
}
