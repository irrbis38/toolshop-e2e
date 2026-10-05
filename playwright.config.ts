import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'; // подхватывает переменные из .env

export default defineConfig({
  testDir: './tests',

  // Тесты в одном файле тоже идут параллельно (значит, они должны быть независимы)
  fullyParallel: true,

  // На CI падаем, если в коде остался test.only
  forbidOnly: !!process.env.CI,

  // Ретраи только на CI и только один: они не должны маскировать флаки
  retries: process.env.CI ? 1 : 0,

  // На CI 2 воркера (у бесплатных раннеров GitHub 2 ядра), локально по умолчанию
  workers: process.env.CI ? 2 : undefined,

  // list: прогресс в консоли, html: отчёт без автооткрытия браузера
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    // Адрес берётся из .env, запасное значение работает без него
    baseURL: process.env.BASE_URL ?? 'https://practicesoftwaretesting.com',

    // getByTestId будет искать по атрибуту data-test (проверьте в DevTools)
    testIdAttribute: 'data-test',

    // Артефакты только для упавших тестов
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Включим при настройке CI (matrix по браузерам):
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
