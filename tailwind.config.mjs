/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
			},
			fontWeight: {
				normal: '400',
				extrabold: '800',
				ultrabold: '950',
			},
			screens: {
				'md': '768px',
				'lg': '1024px',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out',
			},
		},
	},
	plugins: [],
}