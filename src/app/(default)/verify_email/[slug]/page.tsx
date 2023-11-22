import endpoints from "@/config/endpoints";
import { API_BASE_URL } from "@/config/process";
import Link from "next/link";
import React from "react";

const VerifyToken = async ({ params }: { params: { slug: string } }) => {
  let isVerifying = true;
  let isVerified = false;
  const token = params.slug;
  const verifyEndpoint = endpoints.AUTH.VERIFY(token);

  const verifyResponse = await fetch(API_BASE_URL + verifyEndpoint, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await verifyResponse.json();

  if (data.status === "error") {
    isVerified = false;
  }
  if (data.status === "ok") {
    isVerified = true;
  }

  isVerifying = false;

  return (
    <div className="p-4 md:p-12">
      <div className="rounded-xl shadow-full px-4 py-8 grid place-items-center mt-[15vh] text-gray-700 text-2xl font-medium">
        <h1 className="text-5xl md:text-6xl mt-8 font-bold">Authorization</h1>
        <div className="w-[90%] max-w-2xl h-[4px] bg-purple-100 mt-6 mb-10"></div>
        {isVerifying ? (
          <p className="">Please wait while we activate your account</p>
        ) : isVerified ? (
          <div className="">
            <p>Verified Successfully</p>
            <Link href="/login">
              <p className="mt-4 font-normal text-lg text-purple-500 text-center">
                Click here to login
              </p>
            </Link>
          </div>
        ) : (
          <p className="">Verification Failed</p>
        )}
      </div>
    </div>
  );
};

export default VerifyToken;
