import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {

    readonly email: Locator;
    readonly password: Locator;
    readonly repeatPassword: Locator;
    readonly securityQuestion: Locator;
    readonly answer: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        super(page);

        this.email = page.locator('#emailControl');
        this.password = page.locator('#passwordControl');
        this.repeatPassword = page.locator('#repeatPasswordControl');

        this.securityQuestion = page.locator('mat-select');

        this.answer = page.locator('#securityAnswerControl');

        this.registerButton = page.locator('#registerButton');
    }

    async verifyRegisterPageLoaded() {
        await this.waitForVisible(this.email);
    }

    async enterEmail(email: string) {
        await this.fill(this.email, email);
    }

    async enterPassword(password: string) {
        await this.fill(this.password, password);
    }

    async repeatUserPassword(password: string) {
        await this.fill(this.repeatPassword, password);
    }

    async chooseSecurityQuestion() {

        // Wait until dropdown is visible
        await this.securityQuestion.waitFor({
            state: 'visible'
        });

        // Scroll into view
        await this.securityQuestion.scrollIntoViewIfNeeded();

        // Open dropdown
        await this.securityQuestion.click({
            force: true
        });

        // Wait for options to appear
        const firstOption = this.page.locator('mat-option').first();

        await firstOption.waitFor({
            state: 'visible'
        });

        // Select first option
        await firstOption.click();

    }

    async enterAnswer(answer: string) {
        await this.fill(this.answer, answer);
    }

    async clickRegister() {
        await this.click(this.registerButton);
    }

}