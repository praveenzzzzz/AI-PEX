import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { TestDataGenerator } from '../../helpers/TestDataGenerator';

test('Register new Juice Shop user', async ({ page }) => {

    const email = TestDataGenerator.randomEmail();
    const password = TestDataGenerator.randomPassword();
    const answer = TestDataGenerator.randomAnswer();

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    // Home Page
    await homePage.open();
    await homePage.verifyHomePageLoaded();

    // Close welcome banner and cookie popup
    await homePage.dismissWelcomeBanner();

    // Open Account menu
    await homePage.clickAccount();

    // Go to Login page
    await homePage.clickLogin();

    // Verify Login page
    await loginPage.verifyLoginPageLoaded();

    // Click "Not yet a customer?"
    await loginPage.clickRegisterLink();

    // Verify Register page
    await registerPage.verifyRegisterPageLoaded();

    // Fill registration form
    await registerPage.enterEmail(email);
    await registerPage.enterPassword(password);
    await registerPage.repeatUserPassword(password);
    await registerPage.chooseSecurityQuestion();
    await registerPage.enterAnswer(answer);

    // Register
    await registerPage.clickRegister();

});