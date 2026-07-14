import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';

test('Search Product', async ({ page }) => {

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.open();
    await homePage.verifyHomePageLoaded();
    await homePage.dismissWelcomeBanner();

    await productPage.searchProduct('Apple');

    await productPage.verifyProductVisible('Apple Juice (1000ml)');
});