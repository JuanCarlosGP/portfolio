import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://juancarlosgp.github.io',
  base: '/portfolio/',
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
