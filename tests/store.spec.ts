import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Store', () => {
  let petId: number;

  test.beforeEach(async ({ request }) => {
    const newPet = await request.post(`/v2/pet`, {
      data: {
        name: faker.person.firstName(),
        photoUrls: [faker.internet.url()]
      }
    });
    const petResponseBody = await newPet.json();
    expect(newPet.ok()).toBeTruthy();
    petId = petResponseBody.id;
  });

  test('/store/order (POST) - Place an order', async ({ request }) => {
    const response = await request.post(`/v2/store/order`, {
      data: {
        petId: petId,
        quantity: 1
      }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect.soft(responseBody.status).toBe('placed');
    expect.soft(responseBody.complete).toBeFalsy();
    expect.soft(responseBody.id).toBeGreaterThan(0);
    expect.soft(responseBody.petId).toBe(petId);
    expect.soft(responseBody.quantity).toBe(1);
    expect.soft(responseBody.shipDate).toBeDefined();
  });

  test('/store/order (POST) - Try to place invalid order', async ({ request }) => {
    const response = await request.post(`/v2/store/order`, {
      data: {}
    });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
  });
});
