/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#1ed760",
					200: "#3be477",
				},
				secondary: {
					100: "#b3b3b3",
					200: "#515151",
				},
				dark: {
					100: "#121212",
					200: "#1f1f1f",
					300: "#292929",
					400: "#222222",
				},
			},
		},
	},
	plugins: [],
}
