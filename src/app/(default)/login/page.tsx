"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/button";
import { useToast } from "@chakra-ui/react";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const toast = useToast();

  const formAction = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
        callbackUrl,
      }); 

      if (!res?.error) {
        toast({
          position: "top",
          title: "Login Account",
          description: "Logged In Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        router.push(callbackUrl);
      } else {
        toast({
          position: "top",
          title: "Login Account",
          description: res.error,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log({error})
      setIsLoading(false);
      toast({
        position: "top",
        title: "Login Account",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex justify-center w-full py-[10px] md:py-[30px]">
      <form
        action={formAction}
        className="flex flex-col gap-6 md:gap-10 w-[200px] md:w-[396px]"
      >
        <p className="text-center text-xl md:text-3xl font-bold text-custom-gray-800">
          Welcome Back
        </p>

        <div className="w-full flex flex-col gap-4 md:gap-7">
          <input
            className="border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black"
            type="email"
            name="email"
            required
            placeholder="Email"
          />
          <input
            className="border border-gray-300 rounded-lg px-5 py-5 text-[14px] text-black"
            type="password"
            name="password"
            required
            placeholder="Password"
          />
        </div>
        <Button isLoading={isLoading} text="Sign In" color="#F2B246" />
        <p className="text-center text-custom-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register">
            <span className="text-brand-primary">Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
