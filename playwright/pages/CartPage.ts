import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    readonly firstAddToBasketButton: Locator;
    readonly basketButton: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        super(page);

        // First product's Add to Basket button
        this.firstAddToBasketButton = page
            .locator('button[aria-label="Add to Basket"]')
            .first();

        // Shopping Cart icon
        this.basketButton = page.locator(
            'button[aria-label="Show the shopping cart"]'
        );

        // Remove (trash) button inside basket
        this.removeButton = page.locator(
            'button:has(svg[data-icon="trash-alt"])'
        );
    }

    async addFirstProductToBasket() {

        await this.firstAddToBasketButton.waitFor({
            state: 'visible'
        });

        await this.firstAddToBasketButton.click();

    }

    async openBasket() {

        await this.basketButton.click();

    }

    async verifyBasketOpened() {

        await expect(this.page).toHaveURL(/basket/);

    }

    async removeProduct() {

        await this.removeButton.first().click();

    }

}