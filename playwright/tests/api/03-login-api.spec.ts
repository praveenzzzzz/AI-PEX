import { test, expect } from '@playwright/test';
import { APP } from '../../constants/constants';
import { generateRandomEmail } from '../../helpers/random';
import { setToken, setBasketId } from '../../helpers/token';

test('Login API', async ({ request }) => {

    const email = generateRandomEmail();
    const password = 'Pass1234';

    // Register User
    const registerResponse = await request.post(
        `${APP.BASE_URL}/api/Users`,
        {
            data: {
                email,
                password,
                passwordRepeat: password,
                securityQuestion: {
                    id: 1,
                    question: 'Your eldest siblings middle name?'
                },
                securityAnswer: 'Automation'
            }
        }
    );

    expect(registerResponse.status()).toBe(201);

    // Login User
    const loginResponse = await request.post(
        `${APP.BASE_URL}/rest/user/login`,
        {
            data: {
                email,
                password
            }
        }
    );

    expect(loginResponse.status()).toBe(200);
    expect(loginResponse.ok()).toBeTruthy();

    const body = await loginResponse.json();

    // Save Token & Basket ID
    setToken(body.authentication.token);
    setBasketId(body.authentication.bid);

    console.log(body);

    expect(body.authentication.token).toBeDefined();
    expect(body.authentication.bid).toBeGreaterThan(0);
    expect(body.authentication.umail).toBe(email);

});