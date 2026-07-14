import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Verify Juice Shop home page loads', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.verifyHomePageLoaded();
});