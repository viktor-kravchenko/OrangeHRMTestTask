import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    defaultCommandTimeout: 15000,
    setupNodeEvents(on, config) {
      config.env.TEST_USERNAME = process.env.TEST_USERNAME;
      config.env.TEST_PASSWORD = process.env.TEST_PASSWORD;

      return config;
    },
  },
});