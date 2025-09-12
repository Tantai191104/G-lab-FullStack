/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Montserrat", "sans-serif"], // logo, headings
        body: ["Montserrat", "sans-serif"], // nội dung
        pacifico: ["Pacifico", "cursive"], // artistic
        amuro: ["Amuro", "sans-serif"], // custom font
      },
      letterSpacing: {
        widest: "0.25em",
        wider: "0.15em",
      },
      lineHeight: {
        tight: "1.1",
        normal: "1.5",
      },
      colors: {
        primary: "#FF6B6B",
        secondary: "#69C9D0",
        accent: "#F9D423",
      },
    },
  },
  plugins: [],
};
