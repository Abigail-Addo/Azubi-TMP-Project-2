import React from 'react'
import Image from 'next/image'
import { FiArrowUpRight } from "react-icons/fi";
import Link from 'next/link';

const Trending = () => {
    return (
        <>
            <section className='py-10'>
                <div className='container mx-auto'>
                    <div className='flex flex-col items-center justify-center gap-4 pb-10'>
                        <h1 className='font-bold text-3xl'>Top Trending Products</h1>
                        <p className='lg:w-3/4 text-center'>Discover the latest must-have items that are taking the market by storm. Stay ahead with our curated collection
                            of trending products designed to elevate your lifestyle.</p>
                    </div>

                    <div className='grid grid-cols-3 gap-8'>
                        <div className='bg-[#E6EFF5] hover:bg-[#D4EEF9] grid grid-cols-1 items-center justify-center text-start p-10'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-2xl'>Macbook</h1>
                                <p>Up to 50% off laptop</p>
                            </div>
                            <Image src="/assets/image1.png" alt='Laptop' width={300} height={300} className='mx-auto' />

                            <Link href="/shop" className='underline flex items-center justify-start gap-2'>
                                Shop now <FiArrowUpRight />
                            </Link>

                        </div>
                        <div className='bg-[#E6EFF5] hover:bg-[#D4EEF9] grid grid-cols-1 items-center justify-center text-start p-10'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-2xl'>Iphones</h1>
                                <p>Free shipping</p>
                            </div>
                            <Image src="/assets/image2.png" alt='Laptop' width={300} height={300} className='mx-auto' />

                            <Link href="/shop" className='underline flex items-center justify-start gap-2'>
                                Shop now <FiArrowUpRight />
                            </Link>

                        </div>
                        <div className='bg-[#E6EFF5] hover:bg-[#D4EEF9] grid grid-cols-1 items-center justify-center text-start p-10'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-2xl'>Digital Lens</h1>
                                <p>Up to 40% off Camera</p>
                            </div>
                            <Image src="/assets/image3.png" alt='Laptop' width={300} height={300} className='mx-auto' />

                            <Link href="/shop" className='underline flex items-center justify-start gap-2'>
                                Shop now <FiArrowUpRight />
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Trending
