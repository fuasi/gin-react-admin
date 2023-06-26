import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: "http://localhost:8088/api",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
            }
        }
    }
})
