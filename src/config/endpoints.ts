import { API_BASE_URL } from "./process";

const USER = {
  GET_USER: () => `user`,
  UPDATE_USER: () => `user`,
  GEN_APIKEY: () => `user/apikey`
};

const AUTH = {
  LOGIN: () => `auth/signin`,
  REGISTER_INDIVIDUAL: () => `auth/signup/individual`,
  REGISTER_BUSINESS: () => `auth/signup/business`,
  LOGOUT: () => `logout`,
};

const PRICE = {
  GET_PRICE: (ticker: string) => `price?currency=${ticker}`,
};
const TRANSACTION = {
  GET_RECENT: () => `transactions?page=1&limit=15`,
};

const WEBHOOK = {
  UPDATE_WEBHOOK: () => `webhook/register`,
};

const endpoints = {
  USER,
  AUTH,
  PRICE,
  WEBHOOK,
  TRANSACTION,
};

export default endpoints;
