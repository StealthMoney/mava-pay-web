import endpoints from '@/config/endpoints'
import axiosInstance from '@/services/axios'
import React from 'react'
import RegisterForm from './form'
import { AccountTypes } from '@/config/default'

const registerUser = async (formData: FormData) => {
  "use server"
  const { AUTH } = endpoints
  let url = AUTH.REGISTER_INDIVIDUAL()
  console.log({url})
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const password = formData.get("password")
  const accountType = formData.get("accountType")
  const businessName = formData.get("businessName")
  const isBusinessAccount = accountType === AccountTypes.BUSINESS
  const body = {
    name,
    email,
    password,
    phone,
  } as any
  if (isBusinessAccount) {
    url = AUTH.REGISTER_BUSINESS()
    body["businessName"] = businessName
  }
  const res = await axiosInstance.post(url, body)

  if (res.data.status !== "ok") {
    const message = res.data.message
    return { error: message}
  }
  return { success: true }
}

const RegisterPage = async () => {
  return (
    <RegisterForm action={registerUser} />
  )
}

export default RegisterPage