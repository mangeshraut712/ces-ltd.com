import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const systemChrome = ['/usr/local/bin/google-chrome', '/usr/bin/google-chrome'].find((path) =>
  existsSync(path),
);
const chromeExecutable = process.env.PLAYWRIGHT_CHROME || systemChrome;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    launchOptions: {
      ...(chromeExecutable ? { executablePath: chromeExecutable } : {}),
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    },
  },
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
