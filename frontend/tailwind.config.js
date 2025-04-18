/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS

    themes: [
      {
        mytheme: {
          primary: "#38bdf8",

          secondary: "#2dd4bf",

          accent: "#f471b5",

          neutral: "#1d283a",

          "base-100": "#f3f4f6",
          "base-200": "#FAFAFB",

          info: "#0ca6e9",

          success: "#22c55e",

          warning: "#facc15",

          error: "#ef4444",
        },
        // dark: {
        //   ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
        //   //   // "base-100": "#f3f4f6",
        //   //   //   "base-200": "#FAFAFB",
        // },
      },
      "dark",
    ],
  },
}
