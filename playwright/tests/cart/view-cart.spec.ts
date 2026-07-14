import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';

test('Verify Basket', async ({ page }) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.verifyHomePageLoaded();
    await homePage.dismissWelcomeBanner();

    await cartPage.addFirstProductToBasket();

    await cartPage.openBasket();

    await expect(page).toHaveURL(/basket/);

    await expect(
        page.locator('.mat-column-product')
            .filter({ hasText: 'Apple Juice (1000ml)' })
    ).toBeVisible();

});