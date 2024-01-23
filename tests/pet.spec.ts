import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Pet', () => {

    let petId: number;

    test('/pet (POST) - 1 Create new pet', async ({request}) => {
        const name = faker.person.firstName()
        const url = faker.internet.url()
        const newPet = await request.post(`/v2/pet`, {
            data: {
                "name": name,
                "photoUrls": [
                    url
                ]
            }
        });
        expect(newPet.ok()).toBeTruthy();
        const responseBody = await newPet.json();
        expect(responseBody.name).toBe(name);
        expect(responseBody.photoUrls[0]).toBe(url);
        petId = responseBody.id;
    });

    test('/pet (POST) - 2a Try to create new pet without proper body', async ({request}) => {
        const newPet = await request.post(`/v2/pet`, {});
        expect(newPet.ok()).toBeFalsy();
    });

    test('/pet (POST) - 2b Try to create new pet with existing id', async ({request}) => {
        const newPet = await request.post(`/v2/pet`, {
            data: {
                "name": faker.person.firstName(),
                "photoUrls": [
                    faker.internet.url()
                ]
            }
        });
        expect(newPet.ok()).toBeTruthy();
        const responseBody = await newPet.json();
        const id = responseBody.id;
        const anotherPet = await request.post(`/v2/pet`, {
            data: {
                "id": id,
                "name": faker.person.firstName(),
                "photoUrls": [
                    faker.internet.url()
                ]
            }
        });
        expect(anotherPet.ok()).toBeFalsy();
    })

    test('/pet/{petId} (GET) - 1 Fetch pet by id', async ({request}) => {
        const pet = await request.get(`/v2/pet/${petId}`);
        expect(pet.ok()).toBeTruthy();
        const responseBody = await pet.json();
        expect(responseBody.id).toBe(petId);
    })

    test('/pet (PUT) - 1 Edit pets name', async ({request
    }) => {
        const newName = faker.person.firstName()
        const updatedPet = await request.put(`/v2/pet`, {
            data: {
                "id": petId,
                "name": newName,
            }
        });
        expect(updatedPet.ok()).toBeTruthy();
        const responseBody = await updatedPet.json();
        expect(responseBody.name).toBe(newName);
    });

    test('/pet/findByStatus (GET) - 1 find by status', async ({request}) => {
        const pet = await request.get(`/v2/pet/findByStatus?status=available`);
        expect(pet.ok()).toBeTruthy();
        const responseBody = await pet.json();
        expect(responseBody.length).toBeGreaterThan(0);
        expect(responseBody[0].status).toBe('available');
    })

    test('/pet/{petId} (DELETE) - 1 Delete pet', async ({request}) => {
        const pet = await request.delete(`/v2/pet/${petId}`);
        expect(pet.ok()).toBeTruthy();
    })

    test('/pet/{petId} (GET) - 2 Fetch pet by id returns 404', async ({request}) => {
        const pet = await request.get(`/v2/pet/${petId}`);
        expect(pet.ok()).toBeFalsy();
        expect(pet.status()).toBe(404);
    })

    test('/pet/findByStatus (GET) - 2 Expect invalid status error', async ({request}) => {
        const pet = await request.get(`/v2/pet/findByStatus?status=xyz`);
        expect(pet.ok()).toBeFalsy();
    })

})
