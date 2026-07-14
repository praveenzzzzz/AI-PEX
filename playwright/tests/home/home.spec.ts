import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Verify Home Page', async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.verifyHomePageLoaded();
    await homePage.dismissWelcomeBanner();

    await expect(page).toHaveTitle(/OWASP Juice Shop/);

});