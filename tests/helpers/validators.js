const { expect } = require('@playwright/test');

const assertUsersListStructure = (body) => {
  expect(body).toMatchObject({
    page: expect.any(Number),
    per_page: expect.any(Number),
    total: expect.any(Number),
    total_pages: expect.any(Number),
    data: expect.any(Array),
    support: {
      url: expect.any(String),
      text: expect.any(String),
    },
  });
};

const assertUsersListNotEmpty = (body) => {
  expect(body.data).toEqual(expect.any(Array));
  expect(body.data.length).toBeGreaterThan(0);
};

const assertUsersListData = (body) => {
  expect(body.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String),
        first_name: expect.any(String),
      }),
    ])
  );
};

module.exports = {
  assertUsersListStructure,
  assertUsersListNotEmpty,
  assertUsersListData,
};
