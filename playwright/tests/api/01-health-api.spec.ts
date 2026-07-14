import { test, expect } from '@playwright/test';
import { APP } from '../../constants/constants';

test('Health API', async ({ request }) => {

    const response = await request.get(
        `${APP.BASE_URL}/rest/products/search?q=Apple`
    );

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    expect(body.status).toBe('success');
});