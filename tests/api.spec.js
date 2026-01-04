const { test, expect } = require('@playwright/test');
const {
  createApiContext,
  getUsersPage,
  postUsers,
} = require('./helpers/apiClient');
const {
  assertUsersListStructure,
  assertUsersListNotEmpty,
  assertUsersListData,
} = require('./helpers/validators');

test.describe('API Test', () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await createApiContext();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('REQ-001 GET /api/users?page=2 - returns users for page 2', async () => {
    const response = await getUsersPage(apiContext, 2);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.page).toBe(2);
  });

  test('REQ-002 GET /api/users?page=2 - response structure', async () => {
    const response = await getUsersPage(apiContext, 2);

    expect(response.status()).toBe(200);
    const body = await response.json();
    assertUsersListStructure(body);
  });

  test('REQ-003 GET /api/users?page=2 - users list is not empty', async () => {
    const response = await getUsersPage(apiContext, 2);

    expect(response.status()).toBe(200);
    const body = await response.json();
    assertUsersListNotEmpty(body);
    assertUsersListData(body);
  });

  test('REQ-004 POST /api/users?page=2 - invalid HTTP method', async () => {
    const response = await postUsers(apiContext, 2);

    expect(response.status()).toBe(403);
  });
});
