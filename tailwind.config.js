module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gradient: {
          from: "rgb(236, 63, 251)",
          to: "rgba(252, 229, 70, 1)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
