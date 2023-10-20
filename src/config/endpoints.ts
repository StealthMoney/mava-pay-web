import { API_BASE_URL } from "./process";

const USER = {
  GET_BY_ID: (id: number) => `user/${id}`,
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

const endpoints = {
  USER,
  AUTH,
  PRICE
}

export default endpoints;
