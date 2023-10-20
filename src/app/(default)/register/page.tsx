import endpoints from '@/config/endpoints'
import axiosInstance from '@/services/axios'
import React from 'react'
import RegisterForm from './form'

const registerUser = async (formData: FormData) => {
  "use server"
  const url = endpoints.AUTH.REGISTER()
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")
  const body = {
    name,
    email,
    password
  }
  // const res = await axiosInstance.post(url, body)
  
  // if (res.status !== 200) {
  //   const message = res.data.message
  //   return { error: message}
  // }
  return { error: "test error" }
  // return { success: true }
}

const RegisterPage = async () => {
  return (
    <RegisterForm action={registerUser} />
  )
}

export default RegisterPage