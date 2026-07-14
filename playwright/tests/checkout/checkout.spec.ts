import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Checkout Flow', async ({ page }) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.open();
    await homePage.verifyHomePageLoaded();
    await homePage.dismissWelcomeBanner();

    await cartPage.addFirstProductToBasket();

    await cartPage.openBasket();

    await checkoutPage.clickCheckout();

    await checkoutPage.verifyCheckoutPage();

});