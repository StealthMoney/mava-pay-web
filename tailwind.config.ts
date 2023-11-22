import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#F2B246",
          "primary-transparent": "#F2B24633",
          secondary: "#FFDF6C",
        },
        custom: {
          gray: {
            200: "#FAFAFA",
            400: "#979797",
            800: "#303030",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        full: "0px 0px 40px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
