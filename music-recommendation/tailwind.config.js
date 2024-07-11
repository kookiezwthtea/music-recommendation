// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-400': '#d4b5ff',
        'pink-500': '#ff78c7',
        'red-500': '#ff5f5f',
        'pink-100': '#ffe1f0',
        'purple-700': '#7e4cc9',
      },
    },
  },
  plugins: [],
}
