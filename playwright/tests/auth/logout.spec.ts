import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../test-data/users';

test('Logout from Juice Shop', async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Open Home Page
    await homePage.open();
    await homePage.verifyHomePageLoaded();

    // Close banners
    await homePage.dismissWelcomeBanner();

    // Navigate to Login
    await homePage.clickAccount();
    await homePage.clickLogin();

    // Login
    await loginPage.login(
        users.validUser.email,
        users.validUser.password
    );

    // Logout
    await homePage.clickAccount();
    await homePage.clickLogout();

    // Verify Login button is visible again
    await expect(page.locator('#navbarLoginButton')).toBeVisible();

});