import { getProfile } from "@/app/services/user";
import { auth } from "@/auth";
import React from "react";
import AccountForm from "./form";
import axiosInstance from "@/services/axios";
import endpoints from "@/config/endpoints";
import { revalidatePath } from "next/cache";

const saveForm = async (data: FormData) => {
  "use server"
  const phone = data.get("phone");
  const address = data.get("address");
  const nationality = data.get("nationality");
  try {
    const res = await axiosInstance.put(endpoints.USER.UPDATE_USER(), {
      phone, address, nationality
    })
    if (res.status === 200) {
      revalidatePath("/settings/account", 'page')
      return { success: true };
    }
    return { error: res.data.data.message };
  } catch (err: any) {
    return { error: err?.message ? err.message : "Something went wrong"}
  }
}

const Account = async () => {
  const res = await getProfile();
  const profile = res.data.data;
  const initials = profile.name
    ?.split(" ")
    .slice(0, 2)
    .map((name) => name.trim().charAt(0))
    .join("");

  const {name, email} = profile
  const {address, phone, nationality} = profile.kycInfo
  const dbData = {
    name, email, phone,
    address,
    nationality
  }

  return (
    <div>
      <div className="text-custom-gray-800">
        <p className="font-medium">{profile.name}</p>
        <p className="text-[12px] font-medium">{profile.email}</p>
      </div>
      <AccountForm dbData={dbData} saveForm={saveForm}/>
    </div>
  );
};

export default Account;
