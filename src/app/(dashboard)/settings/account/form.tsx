"use client";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";

type AccountFormProps = {
  dbData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    nationality: string;
  };
  saveForm: (data: FormData) => Promise<{ error?: string; success?: boolean }>;
};

const AccountForm = ({ dbData, saveForm }: AccountFormProps) => {
  const pathname = usePathname()
  const toast = useToast();
  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
  });
  const [formData, setFormData] = useState(dbData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = async (formData: FormData) => {
    // add validation here
    setLoading(true)
    const res = await saveForm(formData);
    setLoading(false)
    if (res.success) {
      toast({
        position: "top",
        title: "Update User",
        description: "Account details updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top",
        title: "Update User",
        description: res.error,
        status: "error",
        duration: null,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-full md:w-[300px] lg:w-[500px] mt-6 text-custom-gray-800">
      <form action={validateForm} className="flex flex-col gap-6">
        <FormControl>
          <FormLabel className="text-sm">Name:</FormLabel>
          <Input
            data-edited={formData.name !== dbData.name || null}
            className="data-[edited]:border-brand-primary"
            onChange={handleInputChange}
            type="text"
            name="name"
            value={dbData.name}
            isDisabled
          />
          <FormErrorMessage>name is required</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel className="text-sm">Email:</FormLabel>
          <Input
            data-edited={formData.email !== dbData.email || null}
            className="data-[edited]:border-brand-primary"
            onChange={handleInputChange}
            type="email"
            name="email"
            value={dbData.email}
            isDisabled
          />
          <FormErrorMessage>email is required</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel className="text-sm">Phone number:</FormLabel>
          <Input
            data-edited={formData.phone !== dbData.phone || null}
            className="data-[edited]:border-brand-primary"
            onChange={handleInputChange}
            type="tel"
            name="phone"
            value={formData.phone}
          />
          <FormErrorMessage>phone is required</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel className="text-sm">Address:</FormLabel>
          <Input
            isRequired
            data-edited={formData.address !== dbData.address || null}
            className="data-[edited]:border-brand-primary"
            onChange={handleInputChange}
            type="text"
            name="address"
            value={formData.address}
          />
          <FormErrorMessage>address is required</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel className="text-sm">Nationality:</FormLabel>
          <Input
            required
            data-edited={formData.nationality !== dbData.nationality || null}
            className="data-[edited]:border-brand-primary"
            onChange={handleInputChange}
            type="text"
            name="nationality"
            value={formData.nationality}
          />
          <FormErrorMessage>nationality is required</FormErrorMessage>
        </FormControl>
        <div className="flex justify-center">
          <Button
            type="submit"
            colorScheme="orange"
            className="bg-brand-primary"
            isLoading={loading}
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
