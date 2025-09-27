"use client"

import React from 'react';
import { FiTruck } from "react-icons/fi";
import { LuPackageCheck } from "react-icons/lu";
import { IoDiamondOutline } from "react-icons/io5";
import Image from 'next/image';
const Footer = () => {
    return (
        <>

            <footer className='bg-[#01589A] py-20'>
                <div className='container mx-auto'>
                    <h1 className='text-4xl text-white w-3/5 pb-12'>We&apos;re tackling the biggest challenges in laptops and electronic products.</h1>

                    <div className='grid grid-cols-3 gap-10 text-white'>
                        <div className='grid grid-cols-1 text-center gap-4'>
                            <FiTruck className='text-4xl mx-auto' />
                            <p>Fast & free shipping</p>
                            <p>Every single order ships for free. No minimums, no tiers, no fine print whatsoever.</p>
                        </div>
                        <div className='grid grid-cols-1 text-center gap-4'>
                            <LuPackageCheck className='text-4xl mx-auto' />
                            <p>Innovative, User-Centric Design</p>
                            <p>Our cutting-edge designs prioritize performance, portability, and seamless integration into your lifestyle.</p>
                        </div>
                        <div className='grid grid-cols-1 text-center gap-4'>
                            <IoDiamondOutline className='text-4xl mx-auto' />
                            <p>Durable, High-Quality Materials</p>
                            <p>We use premium aluminum, high-resolution OLED displays, and durable batteries for superior quality.</p>
                        </div>
                    </div>
                </div>
            </footer>

            <footer className='h-28 border border-[#D9D9D9] bg-white'>
                <div className='container mx-auto flex items-center justify-between h-full'>
                    <Image src="/assets/footer.png" alt="Payments" width={200} height={200} />
                    <p>{new Date().getFullYear()} Azushop. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
