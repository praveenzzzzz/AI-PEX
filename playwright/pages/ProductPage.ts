import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {

    readonly searchButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        super(page);

        this.searchButton = page.getByRole('button', {
            name: 'Open search'
        });

        this.searchInput = page.getByRole('textbox');
    }

    async searchProduct(product: string) {

        // Open search bar
        await this.searchButton.click();

        // Type into actual textbox
        await this.searchInput.fill(product);
    }

    async verifyProductVisible(product: string) {

        await expect(
            this.page.getByText(product)
        ).toBeVisible();

    }

}