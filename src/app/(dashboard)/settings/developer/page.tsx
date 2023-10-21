import React from "react";
import DeveloperForm from "./form";
import { getProfile } from "@/app/services/user";
import { API_BASE_URL } from "@/config/process";
import endpoints from "@/config/endpoints";
import axiosInstance from "@/services/axios";

const saveForm = async (formData: FormData) => {
  "use server";
  const url = formData.get("webhookUrl");
  const secret = formData.get("webhookSecret");
  const res = await axiosInstance.post(endpoints.WEBHOOK.UPDATE_WEBHOOK(), {
    url,
    secret
  });
  if (res.status === 200) {
    return { success: true }
  }
  return { error: res.data.data.message };
};
const generateApiKey = async (): Promise<{
  error?: string;
  success?: boolean;
}> => {
  "use server";
  return { success: false };
};

const Developer = async () => {
  const user = await getProfile();
  const userData = user.data.data;
  const webhookSecret = "";
  const webhookUrl = "";
  return (
    <DeveloperForm
      user={userData}
      generateApiKey={generateApiKey}
      saveForm={saveForm}
      webhookSecret={webhookSecret}
      webhookUrl={webhookUrl}
    />
  );
};

export default Developer;
