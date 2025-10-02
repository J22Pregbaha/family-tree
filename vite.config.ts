import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import eslintPlugin from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html)$/i,
    }),
    // Add Brotli compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html)$/i,
    }),
    eslintPlugin({
      cache: false,
      include: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.js']
    }),
    VitePWA({
      registerType: 'prompt',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      includeAssets: ['favicon.ico', 'logo192.png', 'logo512.png', 'offline.html'],
      manifest: {
        name: 'Pillotrack',
        short_name: 'Pillotrack',
        description: 'Your trusted Pharmacy Benefit Manager (PBM)',
        theme_color: '#4E88B2',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            'src': 'favicon.ico',
            'sizes': '64x64 32x32 24x24 16x16',
            'type': 'image/x-icon'
          },
          {
            'src': 'logo192.png',
            'type': 'image/png',
            'sizes': '192x192'
          },
          {
            'src': 'logo512.png',
            'type': 'image/png',
            'sizes': '512x512'
          }
        ]
      },
      disable: typeof navigator === 'undefined' || !navigator.userAgent.includes('Chrome'),
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      }
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  optimizeDeps: {
    include: ['@mui/material/Tooltip', '@emotion/styled', '@mui/material/Unstable_Grid2'],
  },
  build: {
    outDir: 'build',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
})
