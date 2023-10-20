import { API_BASE_URL } from "./process";

const baseURL = API_BASE_URL

const USER = {
  GET_BY_ID: (id: number) => `user/${id}`,
};

const AUTH = {
  LOGIN: () => `login`,
  REGISTER: () => `register`,
  LOGOUT: () => `logout`,
};

const endpoints = {
  USER,
  AUTH
}

export default endpoints;
