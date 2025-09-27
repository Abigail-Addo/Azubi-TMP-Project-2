"use client"

import React from 'react'
import DefaultLayout from './DefaultLayout'
import Image from 'next/image'
import { FiChevronRight } from "react-icons/fi";
import Trending from '@/components/homepage/Trending'
import Footer from '@/components/header/Footer'
const Dashboard = () => {
  return (
    <DefaultLayout>
      <div className='w-full'>

        {/* Hero */}
        <div className='relative w-full h-[80vh]'>
          {/* Background image */}
          <Image
            src="/assets/hero.jpg"
            alt="Hero"
            fill
            className='object-cover'
            priority
          />

          {/* Overlay */}
          <div className='absolute inset-0 bg-black opacity-40'></div>

          {/* Text content */}
          <div className='absolute inset-0 flex items-center justify-start pr-16 md:pr-32 container mx-auto'>
            <div className='text-white space-y-4'>
              <h1 className='text-4xl md:text-6xl font-bold '>Next-Gen <br /> Mobility</h1>
              <p className='text-lg md:text-xl'>
                Power, performance, and style—experience the future of smartphones today
              </p>
              <button className='mt-4 flex items-center gap-2 px-6 py-3 bg-white text-[#01589A] hover:bg-[#01589A] hover:text-white rounded-md font-semibold transition'>
                Shop Now <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <Trending />

        <Footer />
      </div>
    </DefaultLayout>
  )
}

export default Dashboard;
