import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

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
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false
      }
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
    createSvgIconsPlugin({
      iconDirs: [path.resolve('./src/assets/icons/')],
      symbolId: 'local-icon-[name]'
    }),
    viteMockServe({
      mockPath: 'mock',
      supportTs: true,
      localEnabled: true,
      injectCode: `
          import { setupProdMockServer } from '/mock';
          setupProdMockServer();
        `
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
