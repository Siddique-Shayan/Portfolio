import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { contactApiDevPlugin } from './vite-plugin-contact-dev.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env into process.env for the dev-only /api/contact middleware — Vite normally
  // only exposes VITE_-prefixed vars to client code, but this runs server-side in Node.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), contactApiDevPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      sourcemap: false,
    },
  }
})
