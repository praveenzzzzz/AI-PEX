import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';

test('Add Product To Basket', async ({ page }) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.verifyHomePageLoaded();
    await homePage.dismissWelcomeBanner();

    await cartPage.addFirstProductToBasket();

    await cartPage.openBasket();

    await cartPage.verifyBasketOpened();

});