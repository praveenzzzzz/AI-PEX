import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../test-data/users';

test('Login with valid user', async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.open();
    await homePage.verifyHomePageLoaded();

    await homePage.dismissWelcomeBanner();

    await homePage.clickAccount();
    await homePage.clickLogin();

    await loginPage.verifyLoginPageLoaded();

    await loginPage.login(
        users.validUser.email,
        users.validUser.password
    );

    // Verify successful login
    await expect(
        page.getByRole('button', { name: /account/i })
    ).toBeVisible();

    await expect(page).not.toHaveURL(/login/);
});