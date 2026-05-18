import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://inspections.wayfarecon.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
