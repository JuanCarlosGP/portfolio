import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Mobile-360',
      use: {
        viewport: { width: 360, height: 780 },
        isMobile: true,
      },
    },
    {
      name: 'Mobile-390',
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
      },
    },
    {
      name: 'Desktop-1440',
      use: {
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: 'npx vite preview --port 4321',
    port: 4321,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
