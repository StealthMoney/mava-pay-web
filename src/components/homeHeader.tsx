import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeHeader = () => {
  return (
    <div className='p-4 md:p-12'>
      <nav className='flex'>
        <Link href="/">
          <Image alt='mavapay' src="mavapay.svg" width={200} height={100} />
        </Link>
      </nav>
    </div>
  )
}

export default HomeHeader