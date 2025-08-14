import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/maxymhuang.github.io/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React and Router into their own chunk
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Separate animation components
          animations: [
            './src/blocks/TextAnimations/ScrollVelocity/ScrollVelocity',
            './src/blocks/TextAnimations/BlurText/BlurText'
          ],
          // Separate UI components
          components: [
            './src/blocks/Components/SpotlightCard/SpotlightCard',
            './src/blocks/Components/FlowingMenu/FlowingMenu'
          ]
        }
      }
    },
    // Increase chunk size warning limit to 1000kb
    chunkSizeWarningLimit: 1000
  }
})
