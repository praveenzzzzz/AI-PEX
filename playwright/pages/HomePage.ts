import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    readonly searchBox: Locator;
    readonly accountButton: Locator;
    readonly dismissWelcomeBannerButton: Locator;
    readonly cookieButton: Locator;
    readonly loginMenuItem: Locator;
    readonly registerMenuItem: Locator;
    readonly logoutMenuItem: Locator;

    constructor(page: Page) {
        super(page);

        this.searchBox = page.locator('#searchQuery');

        this.accountButton = page.locator('#navbarAccount');

        this.dismissWelcomeBannerButton = page.getByRole('button', {
            name: 'Close Welcome Banner'
        });

        this.cookieButton = page.getByRole('button', {
            name: 'dismiss cookie message'
        });

        this.loginMenuItem = page.locator('#navbarLoginButton');

        this.registerMenuItem = page.locator('#navbarRegisterButton');

        this.logoutMenuItem = page.locator('#navbarLogoutButton');
    }

    async open() {
        await this.goto('/');
    }

    async verifyHomePageLoaded() {
        await this.waitForVisible(this.searchBox);
    }

    async dismissWelcomeBanner() {

        // Give Angular time to render popup
        await this.page.waitForTimeout(1000);

        // Close Welcome Banner
        if (await this.dismissWelcomeBannerButton.isVisible().catch(() => false)) {

            await this.dismissWelcomeBannerButton.click();

            await this.dismissWelcomeBannerButton
                .waitFor({
                    state: 'hidden',
                    timeout: 5000
                })
                .catch(() => {});
        }

        // Close Cookie Banner
        if (await this.cookieButton.isVisible().catch(() => false)) {

            await this.cookieButton.click();

            await this.cookieButton
                .waitFor({
                    state: 'hidden',
                    timeout: 5000
                })
                .catch(() => {});
        }

        // Wait for page to stabilize
        await this.page.waitForLoadState('networkidle');
    }

    async clickAccount() {
        await this.accountButton.click();
    }

    async clickLogin() {
        await this.loginMenuItem.click();
    }

    async clickRegister() {
        await this.registerMenuItem.click();
    }

    async clickLogout() {
        await this.logoutMenuItem.click();
    }

}