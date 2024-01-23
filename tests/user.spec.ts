import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('User', () => {
  test('/user/createWithArray (POST) - Create 1 user', async ({ request }) => {
    const response = await request.post(`/v2/store/order`, {
      data: [
        {
          username: faker.person.firstName() + faker.datatype.number(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phone: faker.phone.number(),
          userStatus: 0
        }
      ]
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});
