/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

import { Nitro } from 'nitropack';

const devBindingsModule = async (nitro: Nitro) => {
  if (nitro.options.dev) {
    nitro.options.plugins.push('./src/dev-bindings.ts');
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [analog({
    nitro: {
      preset: "cloudflare-pages",

      output: {
        dir: "./dist/analog/public",
        serverDir: "./dist/analog/public/_worker.js"
      },

      modules: [devBindingsModule]
    }
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));