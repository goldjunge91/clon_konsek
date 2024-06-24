import type { Config } from "tailwindcss";

const config = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			// padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				helvetica200: ["helvetica200", "sans-serif"],
				helvetica500: ["helvetica500", "sans-serif"],
				roboto300: ["roboto300", "sans-serif"],
				roboto500: ["roboto500", "sans-serif"],
			},
			colors: {
				"text-primary": "rgb(var(--text-primary) / <alpha-value>)",
				"text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
				"button-bg": "rgb(var(--button-bg) / <alpha-value>)",
				"button-text": "rgb(var(--button-text) / <alpha-value>)",
				"button-border": "rgb(var(--button-border) / <alpha-value>)",
				"form-background": "hsl(var(--form-background))",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				// background: "hsl(var(--background))",
				// foreground: "hsl(var(--foreground))",
				background: "#FFFFFF",
				foreground: "#000000",
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
				// Fügen Sie hier die neuen Farbvariablen hinzu
				// "text-primary": "hsl(var(--text-primary))",
				// "text-secondary": "hsl(var(--text-secondary))",
				// "button-bg": "hsl(var(--button-bg))",
				// "button-text": "hsl(var(--button-text))",
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
} satisfies Config;

export default config;
