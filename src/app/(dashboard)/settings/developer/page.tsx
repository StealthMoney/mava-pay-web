import React from "react";
import DeveloperForm from "./form";
import { getProfile } from "@/app/services/user";
import endpoints from "@/config/endpoints";
import axiosInstance from "@/services/axios";
import { auth } from "@/auth";

const saveForm = async (formData: FormData) => {
  "use server";
  const url = formData.get("webhookUrl");
  const secret = formData.get("webhookSecret");
  try {
    const res = await axiosInstance.post(endpoints.WEBHOOK.UPDATE_WEBHOOK(), {
      url,
      secret,
    });
    if (res.status === 200) {
      return { success: true };
    }
    return { error: res.data.data.message };
  } catch (err) {
    return { error: err };
  }
};
const generateApiKey = async (): Promise<{
  error?: string;
  success?: boolean;
}> => {
  "use server";
  return { success: false };
};

const Developer = async () => {
  const session = await auth();
  if (session && session.user.type === "INDIVIDUAL") {
    return (
      <p className="text-center text-2xl text-red-400 font-semibold mt-8 mx-auto">
        Access Denied For Individual Account
      </p>
    );
  }
  const user = await getProfile();
  const userData = user.data.data;
  const webhookSecret = "";
  const webhookUrl = userData.account.webhooks[0]?.url ?? "";
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
