"use client"
import React, { useState } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@nextui-org/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {

    const {user,isSignedIn}=useUser();
    const MenuList=[
        { name:'Home', path:'/' },
        { name:'Create Story', path:'/create-story' },
        { name:'Explore Stories', path:'/explore' },
        { name:'Contact Us', path:'/contact-us' }
    ]
    const [isMenuOpen,setIsMenuOpen]=useState(false);

  return (
    <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle
                aria-label={isMenuOpen?"Close menu":"Open menu"}
                className='sm:hidden'
            />
            <NavbarBrand>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
                <h2 className='font-bold text-xl md:text-2xl text-primary ml-3'>Kidso Story</h2>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify='center' className='hidden sm:flex'>
            {MenuList.map((item) => (
                <NavbarItem key={item.path} className='text-base md:text-xl text-primary font-medium hover:underline mx-1 md:mx-2'>
                    <Link href={item.path}>{item.name}</Link>
                </NavbarItem>
            ))}
        </NavbarContent>

        <NavbarContent justify='end'>
            <Link href={'/dashboard'}>
                <Button color='primary' size='sm' className='md:text-base md:px-4'>
                    {isSignedIn ? 'Dashboard' : 'Get Started'}
                </Button>
            </Link>
            <UserButton/>
        </NavbarContent>

        <NavbarMenu>
            {MenuList.map((item) => (
                <NavbarMenuItem key={item.path} className='py-2'>
                    <Link href={item.path} className='text-xl text-primary font-medium'>
                        {item.name}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default Header
