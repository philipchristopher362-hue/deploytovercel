"use client"
import { UserDetailContext } from '@/app/_context/UserDetailConext'
import { Button } from '@nextui-org/button';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext } from 'react'

function DashboardHeader() {

  const {userDetail,setUserDetail}=useContext(UserDetailContext);

  return (
    <div className='p-4 md:p-7 bg-primary text-white flex flex-col sm:flex-row justify-between items-center gap-4'>
        <h2 className='font-bold text-2xl md:text-3xl'>My Stories</h2>
        <div className='flex flex-wrap gap-2 md:gap-3 items-center justify-center'>
            <Image src={'/coin.png'} alt='coin' width={40} height={40}/>
            <span className='text-lg md:text-2xl'>{userDetail?.credit} Credit Left</span>
            <Link href={'/buy-credits'}>
                <Button className='bg-blue-400 text-sm md:text-base' color='secondary'>
                    Buy More Credits
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default DashboardHeader
