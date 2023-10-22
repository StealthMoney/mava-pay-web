import { auth } from "@/auth";
import { API_BASE_URL } from "@/config/process";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await auth();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

// axiosInstance.interceptors.response.use(
//   async (response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   async (error) => {
//     const statusCode = error.response.status;
//     if (statusCode === 401) {
//       await signOut({ redirect: false });
//       await signIn("github");
//     }
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
