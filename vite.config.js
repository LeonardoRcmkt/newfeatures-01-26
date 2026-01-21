// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig(({ command, mode }) => {
  const isProdBuild = command === 'build' && mode === 'production';

  return {
    plugins: [
      react(),
      ...(isProdBuild
        ? [javascriptObfuscator({
            rotateStringArray: true,
            stringArray: true,
            stringArrayEncoding: ['rc4'],
            stringArrayThreshold: 0.75,
          })]
        : []),
    ],
  };
});