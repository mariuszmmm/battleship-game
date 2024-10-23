import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [
		react(),
		svgr(),
		tsconfigPaths(),
	],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	server: {
		port: 3000,
	},
	base: '/battleship-game/',
});
