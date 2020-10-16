module.exports = {
  future: {},
  purge: [],
  theme: {
    screens: {
      phone: "360px",
      tablet: "768px",
      computer: "1100px",
    },
    colors: {
      primary: {
        lt: "hsl(231, 50%, 65%)",
        default: "hsl(231, 50%, 50%)",
        dk: "hsl(231, 50%, 35%)",
        txt: "hsl(0, 0%, 100%)",
      },
      secondary: {
        lt: "hsl(4, 90%, 65%)",
        default: "hsl(4, 90%, 50%)",
        dk: "hsl(4, 90%, 35%)",
        txt: "hsl(0, 0%, 100%)",
      },
      background: {
        default: "hsl(0, 0%, 100%)",
        txt: "hsl(0, 0%, 0%)",
      },
      surface: {
        default: "hsl(0, 0%, 100%)",
        txt: "hsl(0, 0%, 0%)",
      },
      error: {
        default: "hsl(349, 85%, 40%)",
        txt: "hsl(0, 0%, 100%)",
      },
    },
    extend: {
      spacing: {
        sm: "0.5rem",
        med: "1rem",
        lg: "1.5rem",
      },
    },
  },
  variants: {
    margin: ({ before }) => before(["children", "children-first", "default"]),
  },
  plugins: [require("tailwindcss-children")],
};
