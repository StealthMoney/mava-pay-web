"use client";
import { Profile } from "@/types/user";
import { Button, Spinner, useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  const [loading, setLoading] = useState({
    apiKey: false,
    webhook: false,
  });
  const [error, setError] = useState({
    apiKey: "",
    webhook: "",
  });
  const apiKey = user.account.apiKey;

  const formAction = async (formData: FormData) => {
    console.log("I got here");
    // setLoading((prev) => ({ ...prev, webhook: true }));
    const res = await saveForm(formData);
    console.log({ res });

    if (res.success) {
      toast({
        position: "top",
        title: "Webhook",
        description: "Updated webhook",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Webhook",
        description: "Failed to ping webook",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onGenerateAPIKey = async () => {
    setLoading((prev) => ({ ...prev, apiKey: true }));
    const res = await generateApiKey();
    if (res.success) {
      toast({
        position: "top",
        title: "API Key",
        description: "Generated new API key",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "API Key",
        description: res.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading((prev) => ({ ...prev, apiKey: false }));
  };

  const copyAPIKey = async () => {
    const errorToast = (err: string) => {
      toast({
        position: "top",
        title: "API Key",
        description: err,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    };
    try {
      if (!apiKey) {
        errorToast("No API key on this accout");
        return;
      }
      await navigator.clipboard.writeText(apiKey);
      toast({
        position: "top",
        title: "API Key",
        description: "copied to clipboard!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      errorToast(err?.message ?? "unable to copy");
    }
  };
  return (
    <>
      <fieldset className="flex flex-col gap-4 items-start w-full">
        <label htmlFor="">API Key</label>
        <div className="flex gap-4 w-full items-center">
          <input
            type="password"
            value={apiKey}
            disabled
            className="w-full md:w-[300px] lg:w-[500px] border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black"
          />
          <button
            disabled={!apiKey}
            className="group disabled:cursor-not-allowed"
            onClick={copyAPIKey}
          >
            <Image
              src="/icons/copy.svg"
              width={24}
              height={24}
              alt="copy"
              className="group-active:scale-75"
            />
          </button>
        </div>
        {loading.apiKey ? (
          <Spinner
            thickness="4px"
            emptyColor="gray.200"
            color="orange.500"
            size="md"
          />
        ) : (
          <button
            className="text-sm font-medium text-brand-primary"
            onClick={onGenerateAPIKey}
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
            defaultValue={webhookSecret}
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
            defaultValue={webhookUrl}
          />
        </fieldset>
        <Button
          isLoading={loading.webhook}
          colorScheme="orange"
          type="submit"
          className="px-4 py-2 rounded-xl bg-brand-primary text-white font-medium"
        >
          save
        </Button>
      </form>
    </>
  );
};

export default DeveloperForm;
