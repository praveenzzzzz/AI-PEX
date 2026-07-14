import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';

test('Remove Product From Basket', async ({ page }) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.verifyHomePageLoaded();
    await homePage.dismissWelcomeBanner();

    await cartPage.addFirstProductToBasket();

    await cartPage.openBasket();

    await cartPage.removeProduct();

    // Verify basket is empty
    await expect(
        page.getByRole('button', { name: 'Checkout' })
    ).toBeDisabled();

    await expect(
        page.getByText('Total Price: 0¤')
    ).toBeVisible();

});