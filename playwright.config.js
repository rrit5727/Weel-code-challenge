// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Specify the test directory
  testDir: './tests',

  // Set global timeout for each test
  timeout: 30 * 1000, // 30 seconds

  // Specify the browser type 
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false, 
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
      },
    },    
  ],

  // Reporter options (e.g., list, json, html)
  reporter: 'list',

  // Configure retries for flaky tests
  retries: 2,

  // // Configure the test server if needed
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  //   timeout: 120 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // },
});