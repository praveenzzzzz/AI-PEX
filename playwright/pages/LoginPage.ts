import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly registerLink: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#loginButton');

        this.registerLink = page.getByRole('link', {
            name: 'Not yet a customer?'
        });
    }

    async verifyLoginPageLoaded() {
        await this.waitForVisible(this.emailInput);
    }

    async enterEmail(email: string) {
        await this.fill(this.emailInput, email);
    }

    async enterPassword(password: string) {
        await this.fill(this.passwordInput, password);
    }

    async clickLogin() {
        await this.click(this.loginButton);
    }

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async clickRegisterLink() {
        await this.click(this.registerLink);
    }
}