import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // より読みやすいファイル名形式に変更
        // 形式: [name]-[hash:8].[ext]
        entryFileNames: 'assets/js/[name]-[hash:8].js',
        chunkFileNames: 'assets/js/[name]-[hash:8].js',
        assetFileNames: (assetInfo) => {
          // CSSファイルとその他のアセットを分ける
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash:8].css'
          }
          // その他のアセット（画像など）
          const extType = assetInfo.name?.split('.').pop()
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return 'assets/images/[name]-[hash:8].[ext]'
          }
          return 'assets/[name]-[hash:8].[ext]'
        }
      }
    }
  }
}) 