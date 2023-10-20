import { auth } from '@/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await auth()

  if (!session?.accessToken) {
    redirect("/login")
  }
  else {
    redirect("/dashboard")
  }

  return (
    <></>
  )
}
