const { request } = require('@playwright/test');

const BASE_URL = 'https://reqres.in';

const createApiContext = async () => {
  return request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      'User-Agent': 'Playwright API Tests',
      Accept: 'application/json',
      'x-api-key': process.env.REQRES_API_KEY || '<project_key>',
    },
  });
};

const getUsersPage = async (apiContext, page) => {
  return apiContext.get('/api/users', { params: { page } });
};

const postUsers = async (apiContext, page) => {
  return apiContext.post('/api/users', { params: { page } });
};

module.exports = {
  createApiContext,
  getUsersPage,
  postUsers,
};
