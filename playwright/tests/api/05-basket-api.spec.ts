import { test, expect } from '@playwright/test';
import { APP } from '../../constants/constants';
import { generateRandomEmail } from '../../helpers/random';

test('Basket API', async ({ request }) => {

    const email = generateRandomEmail();
    const password = 'Pass1234';

    // Register User
    await request.post(`${APP.BASE_URL}/api/Users`, {
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
    });

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

    const loginBody = await loginResponse.json();

    const token = loginBody.authentication.token;
    const basketId = loginBody.authentication.bid;

    // Get Basket
    const basketResponse = await request.get(
        `${APP.BASE_URL}/rest/basket/${basketId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    expect(basketResponse.status()).toBe(200);
    expect(basketResponse.ok()).toBeTruthy();

    const basketBody = await basketResponse.json();

    console.log(basketBody);

    expect(basketBody.status).toBe('success');
    expect(basketBody.data.id).toBe(basketId);

});