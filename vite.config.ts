import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve} from 'path';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/lib/index.tsx'),
      name: 'react-epic-layers',
      // the proper extensions will be added
      fileName: (format)=>`index.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
         react:'React',
         'react-dom':'ReactDOM'
        },
      },
      
    },
    sourcemap:true,
    emptyOutDir:true
  },
})
