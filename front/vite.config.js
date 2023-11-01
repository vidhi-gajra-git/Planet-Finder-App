import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
// import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
// import reactRefresh from "@vitejs/plugin-react-refresh";
export default defineConfig({
  // build: {  },
  base: process.env.mode === 'production' ? '/static/' : '/',
  root: './src',
  plugins: [reactRefresh()],
  build: {
    outDir: '../dist', // Output directory for built files
    emptyOutDir: true, // Clear the output directory before building
    rollupOptions: {
      input: {
        index: './src/index.html', // Entry point for your index.html file
        nightsky: './src/nightsky.html',
        main:  './src/main.jsx',
        night:  './src/night.jsx',
        navbar:'./src/navbar.jsx',
        app: './src/App.jsx',
        // Add other entry points if needed
      },
    },
    manifest: true
  },
  
});