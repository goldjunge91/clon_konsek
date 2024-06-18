// tailwind.config.ts
// import type { Config } from "tailwindcss"; // Importiert den Typ "Config" aus TailwindCSS
// import { Config } from 'tailwindcss';
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx", // Pfad zu allen TypeScript- und TSX-Dateien im Verzeichnis "pages"
		"./components/**/*{js,ts,jsx,tsx,mdx}", // Pfad zu allen JS-, TS-, JSX-, TSX- und MDX-Dateien im Verzeichnis "components"
		"./app/**/*.{js,ts,jsx,tsx,mdx}", // Pfad zu allen JS-, TS-, JSX-, TSX- und MDX-Dateien im Verzeichnis "app"
		"./src/**/*.{js,ts,jsx,tsx,mdx}", // Pfad zu allen JS-, TS-, JSX-, TSX- und MDX-Dateien im Verzeichnis "src"
	],
	prefix: "", // Kein Präfix wird auf die generierten Utility-Klassen angewendet
	theme: {
		container: {
			// center: true,
			// padding: "1rem",
		},
		extend: {
			// backgroundImage: {
			// 	"custom-background": "url('/background.jpg')",
			// },
			fontFamily: {
				custom: [
					"helveticaneuelt-std-thin_normal_250",
					"roboto-slab-light_normal_300",
					"roboto-slab-medium_normal_500",
				],
			},
			colors: {
				primary: "#000000",
				animation: {
					"accordion-down": "accordion-down 0.2s ease-out", // Definiert Akkordeon-Herunter-Animation
					"accordion-up": "accordion-up 0.2s ease-out", // Definiert Akkordeon-Hoch-Animation
				},
			},
			plugins: [require("tailwindcss-animate")], // Beinhaltet das Plugin "tailwindcss-animate"
		},
	},
} satisfies Config; // Stellt sicher, dass das Konfigurationsobjekt dem Typ "Config" entspricht

export default config; // Exportiert das Konfigurationsobjekt als Standard-Export

// /** @type {import('tailwindcss').Config} */
// module.exports = {
// 	content: [
// 		"./app/**/*.{js,ts,jsx,tsx,mdx}",
// 		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
// 		"./components/**/*.{js,ts,jsx,tsx,mdx}",
// 		// Or if using `src` directory:
// 		"./src/**/*.{js,ts,jsx,tsx,mdx}",
// 	],
// 	theme: {
// 		extend: {
// 			fontFamily: {
// 				custom: [
// 					'"custom-roboto-slab-light"',
// 					"roboto-slab-light_normal_300",
// 					'"roboto-slab-medium"',
// 					"sans-roboto-slab-light_normal_300",
// 					'"YourCustomFont3"',
// 					"helveticaneuelt-std-thin_normal_250",
// 				], // Custom font family
// 				// display: ["roboto-slab-light, ui-serif"], // Display font family
// 			},
// 		},
// 	},
// 	plugins: [require("tailwindcss-animate")],
// };
