import { API_BASE_URL } from "./process";

const USER = {
  GET_USER: () => `user`,
};

const AUTH = {
  LOGIN: () => `auth/signin`,
  REGISTER_INDIVIDUAL: () => `auth/signup/individual`,
  REGISTER_BUSINESS: () => `auth/signup/business`,
  LOGOUT: () => `logout`,
};

const PRICE = {
  GET_PRICE: (ticker: string) => `price?currency=${ticker}`
}
const WEBHOOK = {
  UPDATE_WEBHOOK: () => `webhook/register`
}

const endpoints = {
  USER,
  AUTH,
  PRICE,
  WEBHOOK
}

export default endpoints;
