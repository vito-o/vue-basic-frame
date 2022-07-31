import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
    ]
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./src/mock", // 解析刚刚user.ts的位置
      localEnabled: true // 是否开启开发环境
    }),
  ]
})
