import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: if you deploy to https://<username>.github.io/<repo-name>/
// set base to '/<repo-name>/' (with slashes). If your repo IS named
// <username>.github.io (root site), leave base as '/'.
export default defineConfig({
  plugins: [react()],
  base: '/ecommerce-cv/',
})
