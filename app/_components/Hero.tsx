import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div className='px-6 md:px-28 lg:px-44 mt-10 min-h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            <div className='text-center md:text-left'>
                <h2 className='text-[42px] sm:text-[56px] md:text-[70px] text-primary font-extrabold py-6 md:py-10 leading-tight'>
                    Craft Magical Stories for kids in Minutes
                </h2>
                <p className='text-lg sm:text-xl md:text-2xl text-primary font-light'>
                    Create fun and personalised stories that bring your child's adventures to life and spark their passion for reading. It only takes a few seconds!
                </p>
                <Link href={'/create-story'}>
                    <Button size='lg' color='primary'
                    className='mt-5 font-bold text-xl md:text-2xl p-6 md:p-8'>
                        Create Story
                    </Button>
                </Link>
            </div>
            <div className='flex justify-center'>
                <Image src={'/hero.png'} alt='hero' width={700} height={400}
                    className='w-full max-w-sm md:max-w-full'
                />
            </div>
        </div>
    </div>
  )
}

export default Hero
