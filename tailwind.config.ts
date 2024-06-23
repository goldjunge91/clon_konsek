import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Pfade zu deinen Template-Dateien, die Tailwind durchsuchen soll, um Stile zu generieren
    "./pages/**/*.{js,ts,jsx,tsx,mdx", // Pfad zu allen TypeScript- und TSX-Dateien im Verzeichnis "pages"
    "./components/**/*{js,ts,jsx,tsx,mdx}", // Pfad zu allen JS-, TS-, JSX-, TSX- und MDX-Dateien im Verzeichnis "components"
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Pfad zu allen JS-, TS-, JSX-, TSX- und MDX-Dateien im Verzeichnis "app"
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Pfad zu allen JS-, TS-, JSX-, TSX- und MDX-Dateien im Verzeichnis "src"
    "../../public", // Pfad zu öffentlichen Dateien zwei Ebenen höher
    "../public", // Pfad zu öffentlichen Dateien eine Ebene höher
    "./styles/**/*.css",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],

  addBase: ({ addBase }: { addBase: (Base: Record<string, any>) => void }) => {
    addBase({
      h1: {
        fontFamily: "helvetica200, arial",
        fontSize: "3rem",
        fontWeight: "200",
        lineHeight: "2.6rem",
        marginBottom: "2rem",
      },
      ".boldweight": {
        fontFamily: "helvetica500",
      },
      "p, label, input": {
        fontFamily: "roboto300, arial",
        fontSize: "1.05rem",
        lineHeight: "1.6rem",
      },
      "a:link, a:visited": {
        color: "#000",
      },
      button: {
        border: "solid 2px #000",
        borderRadius: "0.5rem",
        backgroundColor: "transparent",
        padding: "15px 32px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontFamily: "roboto500, arial",
        fontSize: "1.2rem",
        margin: "2rem 0",
        cursor: "pointer",
        letterSpacing: "0.03rem",
      },
      form: {
        margin: "0",
      },
      fieldset: {
        width: "40%",
        maxWidth: "600px",
        minWidth: "400px",
        border: "none",
        margin: "0",
        padding: "0",
      },
      "input, label": {
        width: "100%",
      },
      label: {
        textTransform: "uppercase",
        fontFamily: "roboto500, arial",
      },
      input: {
        borderRadius: "0.5rem",
        border: "none",
        backgroundColor: "#fff",
        padding: "0.8rem 1rem 0.8rem 1rem",
        marginBottom: "1rem",
      },
      body: {
        backgroundColor: "#efefef",
      },
    });
  },

  addComponents: ({
    addComponents,
  }: {
    addComponents: (components: Record<string, any>) => void;
  }) => {
    addComponents({
      // ".container-mx-auto": {
      //   "@apply mx-auto": {},
      // },
      ".landing-text-left": {
        "@apply gap-y-10 items-center": {},
      },
      ".container-mx-auto-py-8": {
        "@apply mx-auto py-8": {},
      },
      ".container-flex-col": {
        "@apply flex flex-col gap-8 pt-12 pb-24": {},
      },
      ".text-xl-mt-3": {
        "@apply text-xl mt-3": {},
      },
      ".container-py": {
        "@apply py-8": {},
      },
      ".heading-4xl": {
        "@apply text-4xl font-bold": {},
      },
      ".heading-3xl": {
        "@apply text-3xl font-bold mb-4": {},
      },
      ".heading-6xl": {
        "@apply text-6xl font-bold": {},
      },
      ".link-blue": {
        "@apply mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors":
          {},
      },
      // text-xl
      ".link-header": {
        "@apply flex gap-2 items-center hover:underline": {},
      },
      ".link-indigo": {
        "@apply rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
          {},
      },
      ".flex-center": {
        "@apply flex items-center justify-center": {},
      },
      ".flex-col-center": {
        "@apply flex flex-col items-center": {},
      },
      ".button-primary": {
        "@apply py-2 px-4 rounded font-semibold bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary":
          {},
      },
      ".button-muted": {
        "@apply py-2 px-4 rounded font-semibold bg-muted text-muted-foreground cursor-not-allowed":
          {},
      },
      // ".card-rounded": {
      //   "@apply rounded-lg border bg-card text-card-foreground shadow-sm p-1": {},
      // },
      ".text-xl": {
        "@apply text-xl mt-3": {},
      },
      ".text-lg": {
        "@apply text-lg leading-8 text-gray-600 dark:text-gray-200": {},
      },
      ".text-2xl": {
        "@apply text-2xl flex-col px-3": {},
      },
      ".bg-green": {
        "@apply bg-green-100 text-green-800 px-4 py-2 rounded": {},
      },
      ".bg-muted": {
        "@apply bg-muted rounded p-4": {},
      },
    });
  },
} satisfies Config;

export default config;
