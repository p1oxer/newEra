import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        allowedHosts: ["new-era-tunnel.loca.lt", "localhost", "127.0.0.1"],
    },
});
