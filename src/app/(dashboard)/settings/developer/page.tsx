import React from "react";
import DeveloperForm from "./form";
import { getProfile } from "@/app/services/user";
import endpoints from "@/config/endpoints";
import axiosInstance from "@/services/axios";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const saveForm = async (formData: FormData) => {
  "use server";
  const url = formData.get("webhookUrl");
  const secret = formData.get("webhookSecret");
  try {
    const res = await axiosInstance.post(endpoints.WEBHOOK.UPDATE_WEBHOOK(), {
      url,
      secret,
    });

    if (res.data.status === "ok") {
      return { success: true };
    }
    return { error: res.data.data.message };
  } catch (err: any) {
    return { error: err?.message ? err?.message : "something went wrong" };
  }
};
const generateApiKey = async (): Promise<{
  error?: string;
  success?: boolean;
}> => {
  "use server";
  try {
    const res = await axiosInstance.get(endpoints.USER.GEN_APIKEY());
    if (res.data.status === "ok") {
      revalidatePath("/settings/developer", "page");
      return { success: true };
    } else {
      return { error: "unable to generate new api key" };
    }
  } catch (err: any) {
    return {
      error: err?.message ? err.message : "unable to generate new api key",
    };
  }
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
  const { url: webhookUrl, secret: webhookSecret } =
    userData.account.webhooks[0];
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
