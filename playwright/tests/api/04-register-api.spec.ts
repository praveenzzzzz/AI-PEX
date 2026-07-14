import { test, expect } from '@playwright/test';
import { APP } from '../../constants/constants';
import { generateRandomEmail } from '../../helpers/random';

test('Register API', async ({ request }) => {

    const email = generateRandomEmail();
    const password = 'Pass1234';

    const response = await request.post(
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

    // HTTP Validation
    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    // Response Body
    const body = await response.json();

    console.log(body);

    // Business Validation
    expect(body.status).toBe('success');
    expect(body.data.email).toBe(email);
    expect(body.data.id).toBeDefined();

});