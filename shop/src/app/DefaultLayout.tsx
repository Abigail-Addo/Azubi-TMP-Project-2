"use client"



import Header from '@/components/header/Header'
import React, { ReactNode } from 'react'


type DefaultLayoutProps = {
    children: ReactNode
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <>
            <main className='w-screen h-screen gap-0 overflow-x-hidden overflow-y-auto'>
                {/* header */}
                <Header />

                {children}


            </main>
        </>
    )
}

export default DefaultLayout
