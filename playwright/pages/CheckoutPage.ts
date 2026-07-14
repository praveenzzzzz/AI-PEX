import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.checkoutButton = page.getByRole('button', {
            name: 'Checkout'
        });
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async verifyCheckoutPage() {
        await expect(this.page).toHaveURL(/address|checkout|login/);
    }

}