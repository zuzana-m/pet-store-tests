# Pet Store Test Automation

## Prerequisites
* node

## Quick Start
* `npm install` - install dependencies

To run the examples, use the following commands:

* `npm run test` - run all tests

# Test cases

## Pet

### /pet (POST) AUTOMATED
1. **Positive Test Case:**
    - Send a valid request with a JSON body representing a new pet.
    - Expect a successful response with a status code of 200 and a response body conforming to the ApiResponse schema.

2. **Negative Test Cases:**
    - a) Send a request with an invalid JSON body (e.g., missing required fields).
        - Expect an error response with a status code indicating the issue (e.g., 400 Bad Request).
    - b) Attempt to add a pet with duplicate ID.
        - Expect an error response with a status code indicating the issue -> **FOUND A BUG (200 OK instead of 400 Bad Request)**

### /pet (PUT)
1. **Positive Test Case: AUTOMATED**
    - Send a valid request with a JSON body representing an existing pet for updating.
    - Expect a successful response with a status code of 200 and a response body conforming to the ApiResponse schema.

2. **Negative Test Cases:**
    - Send a request with an invalid JSON body or missing required fields.
        - Expect an error response with a status code indicating the issue (e.g., 400 Bad Request).
    - Attempt to update a pet with an invalid ID.
        - Expect an error response with a status code indicating the issue (e.g., 404 Not Found).

### /pet/findByStatus (GET) AUTOMATED
1. **Positive Test Case:**
    - Send a valid request with a status parameter containing "available."
    - Expect a successful response with a status code of 200 and a response body containing an array of pets conforming to the Pet schema.

2. **Negative Test Case:**
    - Send a request with an invalid status parameter.
        - Expect an error response with a status code indicating the issue -> **FOUND A BUG (200 OK instead of 400 Bad Request)**

### /pet/{petId} (GET) AUTOMATED
1. **Positive Test Case:**
    - Send a valid request with a pet ID.
    - Expect a successful response with a status code of 200 and a response body conforming to the Pet schema.

2. **Negative Test Cases:**
    - Send a request with an invalid pet ID.
        - Expect an error response with a status code indicating the issue (e.g., 400 Bad Request or 404 Not Found).

### /pet/{petId} (DELETE) 
1. **Positive Test Case: AUTOMATED**
    - Send a valid request with a pet ID to delete.
    - Expect a successful response with a status code of 200 and a response body conforming to the ApiResponse schema.

2. **Negative Test Cases:**
    - Send a request with an invalid pet ID.
        - Expect an error response with a status code indicating the issue (e.g., 400 Bad Request or 404 Not Found).

### /pet/{petId}/uploadImage (POST)
1. **Positive Test Case:**
   - Send a valid request with a pet ID, additionalMetadata, and a file to upload.
   - Expect a successful response with a status code of 200 and a response body conforming to the ApiResponse schema.

2. **Negative Test Cases:**
   - Send a request without a pet ID.
      - Expect an error response with a status code indicating the issue (e.g., 400 Bad Request).
   - Send a request with invalid or missing file data.
      - Expect an error response with a status code indicating the issue (e.g., 400 Bad Request).
   - Attempt to upload a file for a pet ID that does not exist.
      - Expect an error response with a status code indicating the issue (e.g., 404 Not Found).

## Store

### /store/order (POST) - Place an order for a pet AUTOMATED
1. **Positive Test Case:**
    - Send a valid request with a JSON body representing a new order.
    - Expect a successful response with a status code of 200 and a response body conforming to the Order schema.

## User 

TODO

# Improvements
- Add test cases for Store and User endpoints
- Use typescript types for defining schemas
- Use axios for making requests instead of Playwright
- Use preconditions for tests so that they can be run in parallel
