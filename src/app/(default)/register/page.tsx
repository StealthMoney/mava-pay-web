import endpoints from "@/config/endpoints";
import axiosInstance from "@/services/axios";
import React from "react";
import RegisterForm from "./form";
import { AccountTypes } from "@/config/default";
import { AxiosError, AxiosResponse } from "axios";

type RegisterAuthResponse = {
  status: string;
  message: string;
};

const registerUser = async (formData: FormData) => {
  "use server";
  const { AUTH } = endpoints;
  let url = AUTH.REGISTER_INDIVIDUAL();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const accountType = formData.get("accountType");
  const businessName = formData.get("businessName");
  const isBusinessAccount = accountType === AccountTypes.BUSINESS;
  const body = {
    name,
    email,
    password,
    phone,
  } as any;
  if (isBusinessAccount) {
    url = AUTH.REGISTER_BUSINESS();
    body["businessName"] = businessName;
  }

  const result = await axiosInstance
    .post<RegisterAuthResponse>(url, body)
    .then((res) => {
      if (res.data.status === "ok") {
        return { success: true };
      }
      const message = res.data.message;
      return { error: message };
    })
    .catch((err: AxiosError<RegisterAuthResponse>) => {
      return { error: err.response?.data.message ?? "Something went wrong" };
    });

  return result;
};

const RegisterPage = async () => {
  return <RegisterForm action={registerUser} />;
};

export default RegisterPage;
