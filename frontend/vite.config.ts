/**
 * @Author: Bi Ying
 * @Date:   2022-12-18 00:42:28
 * @Last Modified by:   Bi Ying
 * @Last Modified time: 2024-03-04 00:55:40
 */
import path from 'path'
import {fileURLToPath, URL} from 'node:url'
import type {PluginOption} from 'vite'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

function setupPlugins(env: ImportMetaEnv): PluginOption[] {
    return [
        vue()
    ]
}

// const defaultConfig = {
//     plugins: [vue({
//         script: {
//             defineModel: true
//         }
//     })],
//     resolve: {
//         alias: {
//             '@': fileURLToPath(new URL('./src', import.meta.url))
//         }
//     },
//     optimizeDeps: {
//         include: [
//             'ant-design-vue',
//         ],
//     },
//     define: {
//         __VUE_I18N_FULL_INSTALL__: false,
//         __VUE_I18N_LEGACY_API__: false,
//         __INTLIFY_PROD_DEVTOOLS__: false,
//     },
// }

// export default defineConfig(({command, mode, ssrBuild}) => {
// const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv
//
//     return {
//         ...defaultConfig,
//         server: {
//             proxy: {
//                 '/api': {
//                     target: `http://127.0.0.1:8000/api/`,
//                     ws: true,
//                     changeOrigin: true,
//                     rewrite: (path) => path.replace(/^\/api/, ""),
//                 }
//             }
//         },
//     }
// });
export default defineConfig((env) => {
    const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv

    return {
        base: '/static/',
        resolve: {
            alias: {
                '@': path.resolve(process.cwd(), 'src'),
            },
        },
        optimizeDeps: {
            include: [
                'ant-design-vue',
            ],
        },
        define: {
            __VUE_I18N_FULL_INSTALL__: false,
            __VUE_I18N_LEGACY_API__: false,
            __INTLIFY_PROD_DEVTOOLS__: false,
        },
        plugins: setupPlugins(viteEnv),
        server: {
            host: '0.0.0.0',
            port: 8080,
            open: false,
            proxy: {
                '/api': {
                    target: viteEnv.VITE_APP_API_BASE_URL,
                    changeOrigin: true, // 允许跨域
                    rewrite: path => path.replace('/api/', '/'),
                },
            },
        },
    }
})
