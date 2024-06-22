import type { Config } from "tailwindcss"; // Importiert den Typ "Config" aus TailwindCSS

const config = {
	// purge: ['./pages/**/*.js', './components/**/*.js'], // Pfade zu deinen Template-Dateien, die Tailwind durchsuchen soll, um Stile zu generieren
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
	prefix: "", // Kein Präfix wird auf die generierten Utility-Klassen angewendet
	theme: {
		container: {
			center: true, // Zentriert den Container standardmäßig
			// padding: "1rem", // Fügt dem Container eine Polsterung hinzu

			screens: {
				sm: { min: "640px", max: "767px" },
				// => @media (min-width: 640px and max-width: 767px) { ... }

				md: { min: "768px", max: "1023px" },
				// => @media (min-width: 768px and max-width: 1023px) { ... }

				lg: { min: "1024px", max: "1279px" },
				// => @media (min-width: 1024px and max-width: 1279px) { ... }

				xl: { min: "1280px", max: "1535px" },
				// => @media (min-width: 1280px and max-width: 1535px) { ... }

				"2xl": { min: "1536px" },
				// => @media (min-width: 1536px) { ... }
			},
		},
		extend: {
			fontFamily: {
				helvetica200: ["helvetica200"],
				helvetica500: ["helvetica500"],
				roboto300: ["roboto300"],
				roboto500: ["roboto500"],
				// custom: [
				//   '"custom-roboto-slab-light"',
				//   "roboto-slab-light_normal_300",
				//   '"roboto-slab-medium"',
				//   "sans-roboto-slab-light_normal_300",
				//   '"YourCustomFont3"',
				//   "helveticaneuelt-std-thin_normal_250",
				// ], Custom font family
				// display: ["roboto-slab-light, ui-serif"], // Display font family
			},
			colors: {
				border: "hsl(var(--border))", // Farbe für Ränder
				input: "hsl(var(--input))", // Farbe für Eingabefelder
				ring: "hsl(var(--ring))", // Farbe für Fokusrahmen
				background: "hsl(var(--background))", // Hintergrundfarbe
				foreground: "hsl(var(--foreground))", // Vordergrundfarbe
				primary: {
					DEFAULT: "hsl(var(--primary))", // Standard-Primärfarbe
					foreground: "hsl(var(--primary-foreground))", // Vordergrundfarbe für primäre Elemente
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))", // Standard-Sekundärfarbe
					foreground: "hsl(var(--secondary-foreground))", // Vordergrundfarbe für sekundäre Elemente
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))", // Standard-Destruktivfarbe
					foreground: "hsl(var(--destructive-foreground))", // Vordergrundfarbe für destruktive Elemente
				},
				muted: {
					DEFAULT: "hsl(var(--muted))", // Standard-Gedämpfte Farbe
					foreground: "hsl(var(--muted-foreground))", // Vordergrundfarbe für gedämpfte Elemente
				},
				accent: {
					DEFAULT: "hsl(var(--accent))", // Standard-Akzentfarbe
					foreground: "hsl(var(--accent-foreground))", // Vordergrundfarbe für Akzentelemente
				},
				popover: {
					DEFAULT: "hsl(var(--popover))", // Standard-Popover-Farbe
					foreground: "hsl(var(--popover-foreground))", // Vordergrundfarbe für Popover-Elemente
				},
				card: {
					DEFAULT: "hsl(var(--card))", // Standard-Kartenfarbe
					foreground: "hsl(var(--card-foreground))", // Vordergrundfarbe für Karten-Elemente
				},
			},
			borderRadius: {
				lg: "var(--radius)", // Große Randradius
				md: "calc(var(--radius) - 2px)", // Mittlere Randradius
				sm: "calc(var(--radius) - 4px)", // Kleine Randradius
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" }, // Anfangshöhe für Akkordeon-Herunter-Animation
					to: { height: "var(--radix-accordion-content-height)" }, // Endhöhe für Akkordeon-Herunter-Animation
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" }, // Anfangshöhe für Akkordeon-Hoch-Animation
					to: { height: "0" }, // Endhöhe für Akkordeon-Hoch-Animation
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out", // Definiert Akkordeon-Herunter-Animation
				"accordion-up": "accordion-up 0.2s ease-out", // Definiert Akkordeon-Hoch-Animation
			},
		},
	},
	plugins: [require("tailwindcss-animate")], // Beinhaltet das Plugin "tailwindcss-animate"
} satisfies Config; // Stellt sicher, dass das Konfigurationsobjekt dem Typ "Config" entspricht

export default config; // Exportiert das Konfigurationsobjekt als Standard-Export
