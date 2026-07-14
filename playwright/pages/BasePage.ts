import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async fill(locator: Locator, value: string) {
        await locator.fill(value);
    }

    async waitForVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async getTitle() {
        return await this.page.title();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }
      async acceptCookies() {
        const cookieButton = this.page.getByRole('button', {
            name: 'Me want it!'
        });

        if (await cookieButton.isVisible().catch(() => false)) {
            await cookieButton.click();
        }
    }
}
