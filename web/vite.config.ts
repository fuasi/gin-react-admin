import { defineConfig , splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins : [react() , splitVendorChunkPlugin()] ,
  resolve : {
    alias : {
      "@" : path.resolve(__dirname , "./src") ,
    } ,
  } ,
  server : {
    proxy : {
      '/api' : {
        target : 'http://127.0.0.1:8888' ,
        changeOrigin : true ,
        rewrite : ( path ) => path.replace(/^\/api/ , "api")
      } ,
      '/static' : {
        target : 'http://127.0.0.1:5000' ,
        changeOrigin : true ,
        rewrite : ( path ) => path.replace(/^\/static/ , "static")
      }
    }
  }
})
