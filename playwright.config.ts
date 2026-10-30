import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const systemChrome = ['/usr/local/bin/google-chrome', '/usr/bin/google-chrome'].find((path) =>
  existsSync(path),
);
const chromeExecutable = process.env.PLAYWRIGHT_CHROME || systemChrome;
const testPort = Number(process.env.PLAYWRIGHT_PORT || '3000');
const baseURL = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL,
    trace: 'on-first-retry',
    launchOptions: {
      ...(chromeExecutable ? { executablePath: chromeExecutable } : {}),
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    },
  },
  webServer: {
    command: `npm run dev -- --hostname 127.0.0.1 --port ${testPort}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_PORT,
    timeout: 120_000,
  },
});
