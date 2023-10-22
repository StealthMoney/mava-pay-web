"use client";
import { Profile } from "@/types/user";
import { Spinner } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";

type DeveloperSettingsProps = {
  saveForm: (x: FormData) => Promise<{ error?: string; success?: boolean }>;
  generateApiKey: () => Promise<{ error?: string; success?: boolean }>;
  webhookUrl: string;
  webhookSecret: string;
  user: Profile;
};

const DeveloperForm = ({
  saveForm,
  generateApiKey,
  webhookUrl,
  webhookSecret,
  user,
}: DeveloperSettingsProps) => {
  const [loading, setLoading] = useState({
    apiKey: false,
    webhook: false,
  });
  const [error, setError] = useState({
    apiKey: "",
    webhook: "",
  });
  const apiKey = user.account.apiKey;
  // const [apiKey, setApiKey] = useState(apiKey)
  const [webhook, setWebhook] = useState({
    url: webhookUrl,
    secret: webhookSecret,
  });
  const formAction = async (formData: FormData) => {
    // const isValid = validateData();
    // if (isValid === false) {
    //   return;
    // }
    setLoading((prev) => ({ ...prev, webhook: true }));
    const res = await saveForm(formData);
    console.log({res})
    setLoading((prev) => ({ ...prev, webhook: false }));
    if (res.error) {
      setError((prev) => ({
        ...prev,
        webhook: res.error ?? "An error occured",
      }));
      return;
    }
  };
  return (
    <>
      <fieldset className="flex flex-col gap-4 items-start w-full">
        <label htmlFor="">API Key</label>
        <div className="flex gap-4 w-full">
          <input value={apiKey} disabled className="w-full md:w-[300px] lg:w-[500px] border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black" />
          <button>
            <Image src="/icons/copy.svg" width={24} height={24} alt="copy" />
          </button>
        </div>
        {loading.apiKey ? (
          <Spinner />
        ) : (
          <button
            className="text-sm font-medium text-brand-primary"
            onClick={generateApiKey}
          >
            Generate New Key
          </button>
        )}
      </fieldset>
      <form
        className="w-full flex flex-col items-start gap-4 pt-4 mt-4 border-t-[2px] border-custom-gray-200"
        action={formAction}
      >
        <fieldset className="w-full">
          <label className="block mb-2" htmlFor="webhookSecret">
            <span>Webhook Secret</span>
          </label>
          <input
            className="w-full md:w-[300px] lg:w-[500px] border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black"
            id="webhookSecret"
            type="text"
            name="webhookSecret"
            required
          />
        </fieldset>
        <fieldset className="w-full">
          <label className="block mb-2" htmlFor="webhookUrl">
            <span>Webhook URL</span>
          </label>
          <input
            className="w-full md:w-[300px] lg:w-[500px] border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black"
            id="webhookUrl"
            type="text"
            name="webhookUrl"
            required
            defaultValue={webhook.url}
          />
        </fieldset>
        <button type="submit" className="px-4 py-2 rounded-xl bg-brand-primary text-white font-medium">
          save
        </button>
      </form>
    </>
  );
};

export default DeveloperForm;
