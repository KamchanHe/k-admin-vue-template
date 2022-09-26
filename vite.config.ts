import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteEslint(),
    viteStylelint(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: 'src/components.d.ts',
      dirs: [],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    }),
    viteMockServe({
      mockPath: 'mock',
      supportTs: true,
      localEnabled: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/style/variables.scss" as *;
          @use "@/style/element-plus.scss" as *;
        `
      }
    }
  }
});
