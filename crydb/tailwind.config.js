/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: { 
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        figma: {
          purple: "#B4A6FF",
          lightpurple: "#CFC1FA",
          black: {
            grey300: "#F1F1F1",
            grey400: "#D3D3D4",
            grey500: "#B6B6B7",
            grey600: "#919193",
            grey700: "#6C6C6E",
            grey800: "#48484A",
            grey900: "#232326",
          },
        }
      }
    },
  },
  plugins: [],
}