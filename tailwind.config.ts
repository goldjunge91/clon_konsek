// tailwind.config.ts
// import type { Config } from "tailwindcss"
import { Config } from "tailwindcss";
const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}", 
		"./src/globals.css", 
	],
	prefix: "", // Kein Präfix wird auf die generierten Utility-Klassen angewendet
	theme: {
		container: {
		},
		extend: {
			// backgroundImage: {
			//  "custom-background": "url('/background.jpg')",
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
					"accordion-down": "accordion-down 0.2s ease-out", 
					"accordion-up": "accordion-up 0.2s ease-out", 
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config; 

export default config;