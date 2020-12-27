module.exports = {
  important: "#root",
  future: {},
  purge: [],
  theme: {
    screens: {
      landscape: { raw: "(min-width: 600px) and (max-height: 600px)" },
      computer: { raw: "(min-width: 600px) and (min-height: 600px)" },
    },
    colors: {
      primary: {
        lt: "hsl(231, 50%, 65%)",
        DEFAULT: "hsl(231, 50%, 50%)",
        dk: "hsl(231, 50%, 35%)",
        txt: "hsl(0, 0%, 100%)",
      },
      secondary: {
        lt: "hsl(4, 90%, 65%)",
        DEFAULT: "hsl(4, 90%, 50%)",
        dk: "hsl(4, 90%, 35%)",
        txt: "hsl(0, 0%, 100%)",
      },
      bg: {
        DEFAULT: "hsl(0, 0%, 100%)",
        txt: "hsla(0, 0%, 0%, 0.87)",
        icon: "hsla(0, 0%, 0%, 0.54)",
      },
      surface: {
        DEFAULT: "hsl(0, 0%, 100%)",
        txt: "hsla(0, 0%, 0%, 0.87)",
      },
      error: {
        DEFAULT: "hsl(349, 85%, 40%)",
        txt: "hsl(0, 0%, 100%)",
      },
    },
    extend: {
      spacing: {
        sm: "0.5rem",
        med: "1rem",
        lg: "2rem",
      },
    },
  },
  variants: {
    margin: ({ before }) => before(["children", "children-first", "DEFAULT"]),
    flex: ({ before }) => before(["children", "DEFAULT"]),
    width: ({ before }) => before(["children", "DEFAULT"]),
    cursor: ({ before }) => before(["children", "DEFAULT"]),
  },
  plugins: [require("tailwindcss-children")],
};
