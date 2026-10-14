import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import { rmSync, mkdirSync } from 'fs';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    defaultCommandTimeout: 15000,
    setupNodeEvents(on, config) {
      config.env.TEST_USERNAME = process.env.TEST_USERNAME;
      config.env.TEST_PASSWORD = process.env.TEST_PASSWORD;

      on('task', {
        cleanDownloads() {
          const downloadsDir = config.downloadsFolder;
          rmSync(downloadsDir, { recursive: true, force: true });
          mkdirSync(downloadsDir, { recursive: true });
          return null;
        }
      });

      return config;
    },
  },
});