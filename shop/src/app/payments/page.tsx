"use client"


import React from 'react'
import { useRouter } from 'next/navigation'

const Payment = () => {

    const router = useRouter();


    return (
        <>
            <div className=''>
                <h1>This is the payment page</h1>

                <button
                    className="bg-[#01589A] hover:bg-[#014273] text-white w-1/4 py-2 rounded"
                    type="submit"
                    onClick={() => router.push("/shop")}
                >
                    Continue shopping
                </button>

            </div>
        </>
    )
}

export default Payment
