import endpoints from "@/config/endpoints";
import { API_BASE_URL } from "@/config/process";
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
    <div className="text text-gray-800 h-full p-4 md:p-12">
      <div className="grid place-items-center mt=10">
      {isVerifying ? (
        <p className="text-3xl font-bold">Please wait while we activate your account</p>
      ) : isVerified ? (
        <p className="text-3xl font-bold">Verified</p>
      ) : (
        <p className="text-3xl font-bold">Verification Failed</p>
      )}
      </div>
    </div>
  );
};

export default VerifyToken;
