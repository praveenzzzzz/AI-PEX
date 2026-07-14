import { test, expect } from '@playwright/test';
import { APP } from '../../constants/constants';
import { generateRandomEmail } from '../../helpers/random';

test('Add Product API', async ({ request }) => {

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

    // Add Product
    const addProductResponse = await request.post(
        `${APP.BASE_URL}/api/BasketItems`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                ProductId: 1,
                BasketId: basketId,
                quantity: 1
            }
        }
    );

    expect(addProductResponse.status()).toBe(200);
    expect(addProductResponse.ok()).toBeTruthy();

    const body = await addProductResponse.json();

    console.log(body);

    expect(body.status).toBe('success');
    expect(body.data.ProductId).toBe(1);
    expect(body.data.BasketId).toBe(basketId);
    expect(body.data.quantity).toBe(1);

});