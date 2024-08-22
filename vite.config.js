import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';


export default defineConfig({
	plugins: [
		react(),
		svgr(), // Dodanie wtyczki SVGR
	],
	base: '/ships/', // Ustaw nazwę repozytorium, np. '/my-app/'
});
