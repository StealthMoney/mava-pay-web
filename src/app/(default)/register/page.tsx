import endpoints from "@/config/endpoints";
import axiosInstance from "@/services/axios";
import React from "react";
import RegisterForm from "./form";
import { AccountTypes } from "@/config/default";
import { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "@/config/process";

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

  const result = await fetch(API_BASE_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!result.ok) {
    return {
      success: false,
      message: "Something went wrong",
    }
  }
  const data = await result.json() as RegisterAuthResponse

  return { success: data.status === "ok", message: data.message };
};

const RegisterPage = async () => {
  return <RegisterForm action={registerUser} />;
};

export default RegisterPage;
